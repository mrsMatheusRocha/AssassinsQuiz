import styled from "styled-components";
import React from "react";

function QuizLogo() {
  return (
    <Logo src="/logo.png" alt="Logo do WebApp"/>
  );
}

const Logo = styled.img`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;