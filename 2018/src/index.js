import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import { part1 } from './solutions/day01'


class App extends React.Component {

  getAnswer(day) {
    return part1()
  }
  
  render() {
    return (
    <div className="App">
      <h1>Solutions</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
