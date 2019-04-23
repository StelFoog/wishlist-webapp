import React, { Component } from "react";
import logo from "./logo.svg";
import Button from "./features/components/button/ButtonContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button label="Hej hallå" variant="outlined" color="#73359B" />
        <Button label="Hej hallå" variant="filled" color="#73359B" />
        <Button label="Hej hallå" variant="text" color="#73359B" />
      </div>
    );
  }
}

export default App;
