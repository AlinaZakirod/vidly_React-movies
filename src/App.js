import React, { Component } from "react";

import "./App.css";
// import { getMovies } from "./services/fakeMovieService.js";

import Movies from "./components/movieCell";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

export default App;
