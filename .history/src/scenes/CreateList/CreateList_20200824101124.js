import React, { useState } from "react";
import { Form, StyledCreateList } from "./StyledCreateList";
import * as FirestoreService from "../../services/firestore";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function CreateList(props) {
  const { onCreate, userId } = props;

  const [error, setError] = useState();

  function createDictionary(e) {
    e.preventDefault();
    setError(null);

    const [userName, setUserName] = useState("");
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
    <StyledCreateList>
      <header>
        <h1>The Hellbonix Dictionary!</h1>
      </header>
      <div className="create-container">
        <Form>
          <input
            placeholder="Name the collection"
            type="text"
            name="userName"
            onChange={() => setUserName(e.value)}
          />
          <ErrorMessage errorCode={error}></ErrorMessage>
          <button onClick={createDictionary}>Create a new collection</button>
        </Form>
      </div>
    </StyledCreateList>
  );
}

export default CreateList;
