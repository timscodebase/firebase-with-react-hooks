import React from "react";
import StyledEditDictionary from "./StyledEditDictionary";
import AddWord from "./AddWord/AddWord";
import WordList from "./DictionaryList/WordList";

function EditList(props) {
  const { dictionaryId, user, onCloseDictionary, userId } = props;

  function onCreateDictionaryClick(e) {
    e.preventDefault();
    onCloseDictionary();
  }

  return (
    <StyledEditDictionary>
      <header className="app-header">
        <h1>Hellbonix Dictionary</h1>
      </header>
      <div className="edit-container">
        <p>
          <strong>Hi {user}!</strong>
        </p>
        <p>Add a word to the Hellbonix Dictionary.</p>
        <div className="add-item-column">
          <AddWord {...{ dictionaryId, userId }}></AddWord>
        </div>
        <div className="list-column">
          <WordList {...{ dictionaryId }}></WordList>
        </div>
      </div>
      <footer className="app-footer">
        <p>
          Share your list with others using{" "}
          <a
            href={`/?dictionaryId=${dictionaryId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            this link
          </a>{" "}
          or{" "}
          <a href="/" onClick={onCreateDictionaryClick}>
            create a new word
          </a>
          .
        </p>
      </footer>
    </StyledEditDictionary>
  );
}

export default EditList;
