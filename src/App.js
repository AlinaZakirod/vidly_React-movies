import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movieCell";
import ListGroup from "./components/common/listGroup";

class App extends Component {
  render() {
    return (
      <main className="container">
        <ListGroup />
        <Movies />
      </main>
    );
  }
}

export default App;
