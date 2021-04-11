import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import LoadingBox from "./LoadingBox";
import { useLocation } from "react-router-dom";

function Invite() {
  const { register, handleSubmit, errors, reset } = useForm();
  let sent = useRef(null);
  // const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const onSubmit = (data) => {
    console.log("You pressed 'Send Email'.");
    setLoading(true);
    let opts = {
      username: data.email,
      roles: data.roles,
    };
    console.log(token);
    fetch("/api/register", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opts),
    })
      .then((res) => {
        console.log("Inside promise:");
        console.log(`'res.ok' = ${res.ok}`);
        if (res.ok) {
          // console.log("'res.status' is 201.");
          sent.current = opts.username;
          console.log(`sent.current = ${sent.current}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    reset();
  };

  // useEffect(() => {
  //   if (sent.current) {
  //     setUser(sent.current);
  //     sent.current = null;
  //   }
  //   return () => {
  //     setUser("");
  //   };
  // }, [sent]);

  return (
    <div>
      <h1 className="row central title">New User Invitation</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <>
          <h3>An error has occurred.</h3>
          <p>{error}</p>
        </>
      ) : sent.current ? (
        <h3>An email invitation has been sent to {sent.current}.</h3>
      ) : (
        <>
          <section className="row central">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-div vert-control">
                <label htmlFor="email">Email</label>

                <input
                  type="text"
                  name="email"
                  autoComplete="username"
                  ref={register({
                    required: "*Email is required.",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "*Email is not valid.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="danger">{errors.email.message}</p>
                )}
              </div>
              <div className="form-div vert-control">
                <label htmlFor="roles">Role</label>

                <input
                  type="text"
                  name="roles"
                  placeholder='"admin" or "operator"'
                  ref={register({
                    required: "*Role is required.",
                    minLength: {
                      value: 5,
                      message: '*Please enter "admin" or "operator".',
                    },
                  })}
                />
                {errors.roles && (
                  <p className="danger">{errors.roles.message}</p>
                )}
              </div>
              <button className="submit-btn" type="submit">
                Send Email
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}

export default Invite;
