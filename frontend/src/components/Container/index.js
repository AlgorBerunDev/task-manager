import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 576px) {
    padding: 0 5px;
  }
`;

export default Container;
