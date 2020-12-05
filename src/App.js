import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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
    <>
      <BrowserRouter>
        <div className="grid-container">
          <header>
            <h1>Stats I Care About</h1>
            <div>
              <Link to="/">Home</Link> | <Link to="/page2">Page 2</Link>
            </div>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <p>Edit src/App.js and save to reload.</p>
                <p>The current time is {currentTime}.</p>
              </Route>
              <Route path="/page2">
                <p>This is a page 2!</p>
              </Route>
            </Switch>
          </main>
          <footer>All Rights Reserved.</footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
