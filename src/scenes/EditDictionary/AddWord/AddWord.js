import React, { useState } from "react";
import StyledAddWord from "./StyledAddWord";
import * as FirestoreService from "../../../services/firestore";

import { Button, Input, TextArea } from "../../../components/UI";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function AddWord(props) {
  const { dictionaryId, userId } = props;

  const [newWord, setNewWord] = useState("");
  const [newWordDefinition, setNewWordDefinition] = useState("");
  const [error, setError] = useState("");

  function handleNewWordChange(e) {
    const { value } = e.target;
    setNewWord(value);
  }

  function handleNewWordDefinitionChange(e) {
    const { value } = e.target;
    setNewWordDefinition(value);
  }

  function addWord(e) {
    e.preventDefault();
    setError(null);

    FirestoreService.addDictionaryWord(
      newWord,
      newWordDefinition,
      dictionaryId,
      userId
    )
      .then(() => document.addWordForm.reset())
      .catch((reason) => {
        if (reason.message === "duplicate-word-error") {
          setError(reason.message);
        } else {
          setError("add-list-word-error");
        }
      });
  }

  return (
    <StyledAddWord name="addWordForm">
      <Input
        type="text"
        onChange={handleNewWordChange}
        placeholder="Enter the name of the new word"
      />
      <TextArea
        type="text"
        onInput={handleNewWordDefinitionChange}
        placeholder="Describe the new word"
      />
      <Button type="submit" onClick={addWord}>
        Add Word
      </Button>
      <ErrorMessage errorCode={error}></ErrorMessage>
    </StyledAddWord>
  );
}
