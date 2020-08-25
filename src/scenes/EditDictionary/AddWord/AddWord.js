import React, { useState } from "react";
import StyledAddWord from "./StyledAddWord";
import * as FirestoreService from "../../../services/firestore";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

function AddItem(props) {
  const { dictionaryId, userId } = props;

  const [error, setError] = useState("");

  function addItem(e) {
    e.preventDefault();
    setError(null);

    const itemDesc = document.addItemForm.itemDesc.value;
    if (!itemDesc) {
      setError("grocery-item-desc-req");
      return;
    }

    FirestoreService.addDictionaryItem(itemDesc, dictionaryId, userId)
      .then(() => document.addItemForm.reset())
      .catch((reason) => {
        if (reason.message === "duplicate-item-error") {
          setError(reason.message);
        } else {
          setError("add-list-item-error");
        }
      });
  }

  return (
    <StyledAddWord name="addItemForm">
      <h3>I want...</h3>
      <input type="text" name="itemDesc" />
      <button type="submit" onClick={addItem}>
        Add
      </button>
      <ErrorMessage errorCode={error}></ErrorMessage>
    </StyledAddWord>
  );
}

export default AddItem;
