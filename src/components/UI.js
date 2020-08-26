import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// *** Button ***
const StyledButton = styled.button`
  @media (max-width: 1000px) {
    width: 100%;
    color: var(--light-background-color);
    border-radius: 10px;
    background-color: var(--bright-button);
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

// *** Input ***
const StyledInput = styled.input`
  @media (max-width: 1000px) {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px solid var(--bright-interface-highlight);
  }
`;

const Input = ({ placeholder, onChange }) => (
  <StyledInput placeholder={placeholder} onChange={onChange} />
);

// *** TextArea ***
const StyledTextArea = styled.textarea`
  @media (max-width: 1000px) {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--bright-interface-highlight);
  }
`;

const TextArea = ({ placeholder, onInput }) => (
  <StyledTextArea placeholder={placeholder} onChange={onInput} />
);

export { Button, Input, TextArea };

Button.propTypes = {
  children: PropTypes.object,
};
Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
Button.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
