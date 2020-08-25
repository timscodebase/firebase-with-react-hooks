import React from "react";
import "./StyledEditDictionary.js";
import AddItem from "./AddWord/AddItem";
import ItemList from "./DictionaryList/ItemList";

function EditList(props) {
  const { dictionaryId, user, onCloseDictionary, userId } = props;

  function onCreateDictionaryClick(e) {
    e.preventDefault();
    onCloseDictionary();
  }

  return (
    <div>
      <header className="app-header">
        <h1>Hellbonix Dictionary</h1>
        <p>
          <strong>Hi {user}!</strong>
        </p>
        <p>
          Add a word to the Hellbonix Dictionary. When someone else adds a word
          it will instantly appear in the Hellbonix Dictionary.
        </p>
      </header>
      <div className="edit-container">
        <div className="add-item-column">
          <AddItem {...{ dictionaryId, userId }}></AddItem>
        </div>
        <div className="list-column">
          <ItemList {...{ dictionaryId }}></ItemList>
        </div>
      </div>
      <footer className="app-footer">
        <p>
          Share your list with others using{" "}
          <a
            href={`/?listId=${dictionaryId}`}
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
    </div>
  );
}

export default EditList;
