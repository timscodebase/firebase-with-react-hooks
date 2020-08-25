import styled from "styled-components";

const StyledCreateList = styled.div`
  @media (max-width: 1000px) {
    header {
      color: var(--header-text-color);
    }

    .create-container {
      padding: 1rem;
      border: 1px solid var(--interface-highlight);
    }
  }
`;

const Form = styled.form`
  button,
  input {
    width: 100%;
  }

  button {
    background-color: var(--bright-button);
  }
`;

export { Form, StyledCreateList };
