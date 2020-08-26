import React, { useState, useEffect } from "react";

import * as FirestoreService from "./services/firestore";

import CreateList from "./scenes/CreateDictionary/CreateDictionary";
import JoinList from "./scenes/JoinDictionary/JoinDictionary";
import EditList from "./scenes/EditDictionary/EditDictionary";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useQueryString from "./hooks/useQueryString";

function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [dictionary, setDictionary] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [dictionaryId, setDictionaryId] = useQueryString("dictionaryId");

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (dictionaryId) {
          FirestoreService.getDictionary(dictionaryId)
            .then((dictionary) => {
              if (dictionary.exists) {
                setError(null);
                setDictionary(dictionary.data());
              } else {
                setError("grocery-list-not-found");
                setDictionaryId();
              }
            })
            .catch(() => setError("grocery-list-get-fail"));
        }
      })
      .catch(() => setError("anonymous-auth-failed"));
  }, [dictionaryId, setDictionaryId]);

  function onDictionaryCreate(dictionaryId, userName) {
    setDictionaryId(dictionaryId);
    setUser(userName);
  }

  function onCloseDictionary() {
    setDictionaryId();
    setDictionary();
    setUser();
  }

  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getDictionary(dictionaryId)
      .then((updatedDictionary) => setDictionary(updatedDictionary.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  // render a scene based on the current state
  if (dictionary && user) {
    return (
      <EditList
        {...{ dictionaryId, user, onCloseDictionary, userId }}
      ></EditList>
    );
  } else if (dictionary) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList
          users={dictionary.users}
          {...{ dictionaryId, onSelectUser, onCloseDictionary, userId }}
        ></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList onCreate={onDictionaryCreate} userId={userId}></CreateList>
    </div>
  );
}

export default App;
