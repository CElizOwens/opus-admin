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
import { useAuth } from "./auth";
import Finalize from "./Components/Finalize";
import Invite from "./Components/Invite";
import NoMatch from "./Components/NoMatch";

function App() {
  const [logged] = useAuth();
  return (
    <>
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link to="/">
                <h1>Opus Oakland</h1>
              </Link>
            </div>
            <div>
              <Link to="/programs">Programs</Link> |{" "}
              <Link to="/repertoire">Repertoire</Link> |{" "}
              <Link to="/venues">Venues</Link> |{" "}
              <Link to="/login">{!logged ? <>Login</> : <>Account</>}</Link> |{" "}
              <Link to="/secret">Secret</Link>
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
                  {/* <PrivateRoute path="/programs" component={Programs} /> */}
                  <Programs />
                </Route>
                <Route path="/repertoire">
                  <Repertoire />
                </Route>
                <Route path="/secret">
                  {/* <PrivateRoute path="/secret" component={Secret} /> */}
                  <Secret />
                </Route>
                <Route path="/venues">
                  <Venues />
                </Route>
                <PrivateRoute path="/invite" component={Invite} />
                <Route>
                  <Finalize path="finalize" />
                </Route>
                {/* <PrivateRoute path="/finalize" component={Finalize} /> */}

                {/* <Route path="/time">
                  <Time />
                </Route> */}
                <Route>
                  <NoMatch />
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
