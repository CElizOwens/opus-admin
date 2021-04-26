import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Link } from "react-router-dom";
import LoadingBox from "./LoadingBox";

function Finalize() {
  const { register, handleSubmit, errors, watch } = useForm({});

  let query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const password = useRef({});
  const emailAddress = useRef({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [finalized, setFinalized] = useState(false);
  let finalized_token = useRef(null);
  let opts = useRef(null);
  password.current = watch("password", "");

  function onSubmit(data) {
    console.log("You pressed 'Submit Password'.");
    setLoading(true);
    opts.current = {
      username: data.username,
      password: data.password,
    };
    console.log(`onSubmit: 'opts.current = ${opts.current}`);
    console.log(`onSubmit: 'opts.current.username = ${opts.current.username}`);
    console.log(`onSubmit: 'opts.current.password = ${opts.current.password}`);
    fetch("/api/finalize", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("After finalize:");
        console.log(`'res.ok' = ${res.ok}`);
        return res.json();
      })
      .then((res_json) => {
        console.log("res_json = " + res_json);
        finalized_token.current = res_json.access_token;
        console.log("finalized_token.current = " + finalized_token.current);
        opts.current.username = res_json.username;
        console.log(`opts.current.username = ${opts.current.username}`);
        if (finalized_token.current) {
          setFinalized(true);
        } else {
          setError("An error has occured. Contact support for help.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError("An error has occured. Contact support for help.");
        setLoading(false);
      });
  }

  useEffect(() => {
    if (finalized) {
      console.log(
        `'opts.current' = ${opts.current}.\nFetching 'post_finalize'.`
      );
      fetch("/api/post_finalize", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + finalized_token.current,
          "Content-type": "application/json",
        },
        body: JSON.stringify(opts.current),
      })
        .then((res) => {
          console.log("After post_finalize:");
          console.log(`'res.ok' = ${res.ok}`);
        })
        .then(() => {
          setRegistered(true);
        })
        .catch((err) => {
          console.log(err.message);
          setError("An error has occured. Contact support for help.");
        });
    }
    return () => {
      // finalized_token.current = null;
      // opts.current = null;
    };
  }, [opts, finalized_token, finalized]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <>
          {/* <h3>An error has occurred.</h3> */}
          <p>{error}</p>
        </>
      ) : !registered ? (
        <div>
          <h1 className="row central title">Create a password</h1>
          <section className="row central">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  hidden
                  readOnly
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={emailAddress}
                />
              </div>
              <div className="form-div vert-control">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  ref={register({
                    required: "*Password is required.",
                    minLength: {
                      value: 8,
                      message: "*Password must be at least 8 characters.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="danger">{errors.password.message}</p>
                )}
              </div>
              <div className="form-div vert-control">
                <label htmlFor="password_repeat">Repeat password</label>

                <input
                  type="password"
                  name="password_repeat"
                  autoComplete="new-password"
                  ref={register({
                    validate: (value) =>
                      value === password.current || "*Passwords must match.",
                  })}
                />
                {errors.password_repeat && (
                  <p className="danger">{errors.password_repeat.message}</p>
                )}
              </div>
              <div>
                <button className="submit-btn" type="submit">
                  Submit Password
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div>
          <h2 className="row central title">Registration successful!</h2>
          <section className="row central">
            <Link to="/login">Login</Link>
          </section>
        </div>
      )}
    </>
  );
}

export default Finalize;
