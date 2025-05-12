import styled from "styled-components";
import React from "react";

function QuizLogo({logo}) {
  return (
    <Logo src={logo} alt="Logo do WebApp"/>
  );
}

const Logo = styled.img`
  height: 116px;
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    height: 140px;
    margin: 0 auto;
  }
`;

export default QuizLogo;