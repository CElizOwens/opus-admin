import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { PrivateRoute } from "./Components/PrivateRoute";
import Secret from "./Components/Secret";
import Programs from "./Components/Programs";
import Repertoire from "./Components/Repertoire";
// import Time from "./Components/Time";
import Venues from "./Components/Venues";

function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <>
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link to="/">
                <h1>Opus Admin Site</h1>
              </Link>
            </div>
            <div>
              <Link to="/programs">Programs</Link> |{" "}
              <Link to="/repertoire">Repertoire</Link> |{" "}
              <Link to="/venues">Venues</Link> | <Link to="/login">Login</Link>{" "}
              | <Link to="/secret">Secret</Link>
              {/*{" "}
              | <Link to="/time">Time Zones</Link>*/}
            </div>
          </header>
          <main>
            <div className="outer">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/programs">
                  <Programs />
                </Route>
                <Route path="/repertoire">
                  <Repertoire />
                </Route>
                <PrivateRoute path="/secret" component={Secret} />
                <Route path="/venues">
                  <Venues />
                </Route>
                {/* <Route path="/time">
                  <Time />
                </Route> */}
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
