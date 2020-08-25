import React, { useState, useEffect } from "react";

import * as FirestoreService from "./services/firestore";

import CreateList from "./scenes/CreateList/CreateList";
import JoinList from "./scenes/JoinList/JoinList";
import EditList from "./scenes/EditList/EditList";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useQueryString from "./hooks/useQueryString";

function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [dictionary, setGroceryList] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [dictionaryId, setGroceryListId] = useQueryString("listId");

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (dictionaryId) {
          FirestoreService.getGroceryList(dictionaryId)
            .then((dictionary) => {
              if (dictionary.exists) {
                setError(null);
                setGroceryList(dictionary.data());
              } else {
                setError("grocery-list-not-found");
                setGroceryListId();
              }
            })
            .catch(() => setError("grocery-list-get-fail"));
        }
      })
      .catch(() => setError("anonymous-auth-failed"));
  }, [dictionaryId, setGroceryListId]);

  function onGroceryListCreate(dictionaryId, userName) {
    setGroceryListId(dictionaryId);
    setUser(userName);
  }

  function onCloseGroceryList() {
    setGroceryListId();
    setGroceryList();
    setUser();
  }

  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getGroceryList(dictionaryId)
      .then((updatedGroceryList) => setGroceryList(updatedGroceryList.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  // render a scene based on the current state
  if (dictionary && user) {
    return (
      <EditList
        {...{ dictionaryId, user, onCloseGroceryList, userId }}
      ></EditList>
    );
  } else if (dictionary) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList
          users={dictionary.users}
          {...{ dictionaryId, onSelectUser, onCloseGroceryList, userId }}
        ></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList onCreate={onGroceryListCreate} userId={userId}></CreateList>
    </div>
  );
}

export default App;
