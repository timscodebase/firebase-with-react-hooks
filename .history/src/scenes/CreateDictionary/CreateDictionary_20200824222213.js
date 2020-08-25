import React, { useState } from "react";
import { Form, StyledCreateDictionary } from "./StyledCreateDictionary";
import * as FirestoreService from "../../services/firestore";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function CreateList(props) {
  const { onCreate, userId } = props;

  const [error, setError] = useState();
  const [userName, setUserName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  function createDictionary(e) {
    e.preventDefault();
    setError(null);

    if (!userName) {
      setError("user-name-required");
      return;
    }

    FirestoreService.createDictionary(userName, userId)
      .then((docRef) => {
        onCreate(docRef.id, userName);
      })
      .catch((reason) => setError("create-list-error"));
  }

  return (
    <StyledCreateDictionary>
      <header>
        <h1>The Hellbonix Dictionary!</h1>
      </header>
      <div className="create-container">
        <Form>
          <input
            placeholder="Please enter your name 😀"
            type="text"
            name="userName"
            onChange={handleInputChange}
          />
          <ErrorMessage errorCode={error}></ErrorMessage>
          <button onClick={createDictionary}>Continue</button>
        </Form>
      </div>
    </StyledCreateDictionary>
  );
}
