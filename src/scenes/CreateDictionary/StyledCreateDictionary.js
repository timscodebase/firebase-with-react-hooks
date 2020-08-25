import styled from "styled-components";

const StyledCreateDictionary = styled.div`
  @media (max-width: 1000px) {
    .create-container {
      padding: 1rem;
      border: 1px solid var(--interface-highlight);
    }
  }
`;

const Form = styled.form`
  @media (max-width: 1000px) {
    button,
    input {
      width: 100%;
    }

    button {
      background-color: var(--bright-button);
    }
  }
`;

export { Form, StyledCreateDictionary };
