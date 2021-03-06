import styled from "styled-components";

const StyledEditDictionary = styled.div`
  .edit-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .add-item-column {
    min-width: 300px;
    width: 25%;
    border: 1px solid var(--interface-highlight);
    padding: 20px;
    border-radius: 2%;
    margin: 5px;
    text-align: center;
  }

  .list-column {
    min-width: 300px;
    width: 25%;
    border: 1px solid var(--interface-highlight);
    padding: 20px;
    border-radius: 2%;
    margin: 5px;
    text-align: center;
  }
`;

export default StyledEditDictionary;
