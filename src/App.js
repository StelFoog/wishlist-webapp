import React, { Component } from "react";
import Button from "./features/components/button";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button label="Filled" variant="filled" color="#73359B" />
        <Button label="Outline" variant="outlined" color="#73359B" />
        <Button label="Text" variant="text" color="#73359B" />
      </div>
    );
  }
}

export default App;
