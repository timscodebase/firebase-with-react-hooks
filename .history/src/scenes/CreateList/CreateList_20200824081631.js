import React, { useState } from "react";
import StyledCreateList from "./CreateList";
import * as FirestoreService from "../../services/firestore";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function CreateList(props) {
  const { onCreate, userId } = props;

  const [error, setError] = useState();

  function createDictionary(e) {
    e.preventDefault();
    setError(null);

    const userName = document.createListForm.userName.value;
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
        <div>
          <form name="createListForm">
            <p>
              <label>What is your name?</label>
            </p>
            <p>
              <input type="text" name="userName" />
            </p>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <p>
              <button onClick={createDictionary}>
                Create a new collection
              </button>
            </p>
          </form>
        </div>
      </div>
    </StyledCreateList>
  );
}

export default CreateList;