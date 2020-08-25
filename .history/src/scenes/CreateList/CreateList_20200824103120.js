import React, { useEffect, useState } from "react";
import { Form, StyledCreateList } from "./StyledCreateList";
import * as FirestoreService from "../../services/firestore";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function CreateList(props) {
  const { onCreate, userId } = props;

  const [error, setError] = useState();
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    handleFocus();
  }, []);

  function handleFocus() {
    inputRef.current.focus();
  }

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
    <StyledCreateList>
      <header>
        <h1>The Hellbonix Dictionary!</h1>
      </header>
      <div className="create-container">
        <Form>
          <input
            ref={inputRef}
            placeholder="Name the collection"
            type="text"
            name="userName"
            onChange={handleInputChange}
          />
          <ErrorMessage errorCode={error}></ErrorMessage>
          <button onClick={createDictionary}>Create a new collection</button>
        </Form>
      </div>
    </StyledCreateList>
  );
}
