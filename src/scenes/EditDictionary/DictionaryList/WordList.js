import React, { useEffect, useState } from "react";
import * as FirestoreService from "../../../services/firestore";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function WordList(props) {
  const { dictionaryId } = props;

  const [dictionaryWords, setDictionaryWords] = useState([]);
  const [error, setError] = useState();

  // Use an effect hook to subscribe to the dictionary list item stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    const unsubscribe = FirestoreService.streamDictionaryWords(dictionaryId, {
      next: (querySnapshot) => {
        const updatedDictionaryWords = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setDictionaryWords(updatedDictionaryWords);
      },
      error: () => setError("dictionary-list-item-get-fail"),
    });
    return unsubscribe;
  }, [dictionaryId, setDictionaryWords]);

  const dictionaryWordElements = dictionaryWords.map((dictionaryWord, i) => (
    <div key={i}>
      <p>{dictionaryWord.word}</p>
      <p>{dictionaryWord.definition}</p>
    </div>
  ));

  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <div>{dictionaryWordElements}</div>
    </div>
  );
}
