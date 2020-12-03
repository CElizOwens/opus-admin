import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    async function getTime() {
      const res = await fetch("/api/time");
      const data = await res.json();
      setCurrentTime(data.time);
    }
    getTime();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link className="App-link" to="/page2">
              Page 2
            </Link>
          </div>
          <Switch>
            <Route exact path="/">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <p>The current time is {currentTime}.</p>
            </Route>
            <Route path="/page2">
              <p>This is a page 2!</p>
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
