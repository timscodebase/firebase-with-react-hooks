import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const createDictionary = (userName, userId) => {
  return db.collection("dictionaries").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName,
      },
    ],
  });
};

export const getDictionary = (dictionaryId) => {
  return db.collection("dictionaries").doc(dictionaryId).get();
};

export const getDictionaryWords = (dictionaryId) => {
  return db
    .collection("dictionaries")
    .doc(dictionaryId)
    .collection("words")
    .get();
};

export const streamDictionaryWords = (dictionaryId, observer) => {
  return db
    .collection("dictionaries")
    .doc(dictionaryId)
    .collection("words")
    .orderBy("created")
    .onSnapshot(observer);
};

export const addUserToDictionary = (userName, dictionaryId, userId) => {
  return db
    .collection("dictionaries")
    .doc(dictionaryId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName,
      }),
    });
};

export const addDictionaryWord = (word, definition, dictionaryId, userId) => {
  console.log(definition);
  return getDictionaryWords(dictionaryId)
    .then((querySnapshot) => querySnapshot.docs)
    .then((dictionaryWords) =>
      dictionaryWords.find(
        (dictionaryWord) =>
          dictionaryWord.data().name.toLowerCase() === word.toLowerCase()
      )
    )
    .then((matchingWord) => {
      if (!matchingWord) {
        return db
          .collection("dictionaries")
          .doc(dictionaryId)
          .collection("words")
          .add({
            word,
            definition,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
          });
      }
      throw new Error("duplicate-word-error");
    });
};
