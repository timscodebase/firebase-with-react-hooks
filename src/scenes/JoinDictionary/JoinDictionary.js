import React, { useState } from "react";
import "./StyledJoinDictionary.js";
import * as FirestoreService from "../../services/firestore";

import { Button, Input } from "../../components/UI";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function JoinDictionary({
  users,
  dictionaryId,
  onSelectUser,
  onCloseDictionary,
  userId,
}) {
  const [error, setError] = useState();
  const [userName, setUserName] = useState("");

  function handleChange(e) {
    setUserName(e.target.value);
  }

  function addExistingUser(e) {
    e.preventDefault();
    onSelectUser(e.target.innerText);
  }

  function getUserButtonList() {
    const buttonList = users.map((user) => (
      <Button key={user.name} onClick={addExistingUser}>
        {user.name}
      </Button>
    ));
    return <div className="button-group">{buttonList}</div>;
  }

  function addNewUser(e) {
    e.preventDefault();
    setError(null);

    if (users.find((user) => user.name === userName)) {
      onSelectUser(userName);
    } else {
      FirestoreService.addUserToDictionary(userName, dictionaryId, userId)
        .then(() => onSelectUser(userName))
        .catch(() => setError("add-user-to-list-error"));
    }
  }

  function onCreateListClick(e) {
    e.preventDefault();
    onCloseDictionary();
  }

  return (
    <div>
      <header>
        <h1>Hellbonix Dictionary</h1>
      </header>
      <div className="join-container">
        <div>
          <form name="addUserToListForm">
            <p>Select your name if you previously joined the list...</p>
            {getUserButtonList()}
            <p>...or enter your name to join the list...</p>
            <p>
              <Input
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              <Button onClick={addNewUser}>Join</Button>
            </p>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <p>
              ...or{" "}
              <a href="/" onClick={onCreateListClick}>
                create a new Dictionary
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
