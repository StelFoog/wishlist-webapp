import React, { Component } from "react";

import Button from "./../../components/button/ButtonContainer";

const HomePage = () => (
  <React.Fragment>
    <Button label="Filled" variant="filled" color="#73359B" fontSize="1rem" />
    <Button
      label="Outline"
      variant="outlined"
      color="#73359B"
      padding="1rem 1rem"
    />
    <Button label="Text" variant="text" color="#73359B" />
  </React.Fragment>
);

export default HomePage;
