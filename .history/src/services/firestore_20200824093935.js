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
  console.log("createDictionary called");
  console.log(userId);
  return db.collection("dictionarys").add({
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
  return db.collection("dictionarys").doc(dictionaryId).get();
};

export const getDictionaryItems = (dictionaryId) => {
  return db
    .collection("dictionarys")
    .doc(dictionaryId)
    .collection("items")
    .get();
};

export const streamDictionaryItems = (dictionaryId, observer) => {
  return db
    .collection("dictionarys")
    .doc(dictionaryId)
    .collection("items")
    .orderBy("created")
    .onSnapshot(observer);
};

export const addUserToDictionary = (userName, dictionaryId, userId) => {
  return db
    .collection("dictionarys")
    .doc(dictionaryId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName,
      }),
    });
};

export const addDictionaryItem = (item, dictionaryId, userId) => {
  return getDictionaryItems(dictionaryId)
    .then((querySnapshot) => querySnapshot.docs)
    .then((dictionaryItems) =>
      dictionaryItems.find(
        (dictionaryItem) =>
          dictionaryItem.data().name.toLowerCase() === item.toLowerCase()
      )
    )
    .then((matchingItem) => {
      if (!matchingItem) {
        return db
          .collection("dictionarys")
          .doc(dictionaryId)
          .collection("items")
          .add({
            name: item,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
          });
      }
      throw new Error("duplicate-item-error");
    });
};
