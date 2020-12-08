import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Environment from "./Components/Environment";
import Home from "./Components/Home";
import Time from "./Components/Time";
import Venues from "./Components/Venues";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <h1>Stats For Me</h1>
            </div>
            <div>
              <Link to="/">Home</Link> |<Link to="/venues">Venues</Link> |{" "}
              <Link to="/time">Time Zones</Link> |{" "}
              <Link to="/environment">Environment</Link>
            </div>
          </header>
          <main>
            <div className="outer">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/venues">
                  <Venues />
                </Route>
                <Route path="/time">
                  <Time />
                </Route>
                <Route path="/environment">
                  <Environment />
                </Route>
              </Switch>
            </div>
          </main>
          <footer className="row central">All Rights Reserved.</footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
