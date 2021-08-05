import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login, useAuth, logout, authFetch } from "../auth";

export default function Login() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [logged] = useAuth();
  const { message, setMessage } = useState("");

  const onSubmit = (data) => {
    console.log("You pressed login");
    let opts = {
      username: data.email,
      password: data.password,
    };
    // console.log(opts);
    fetch("/api/login", {
      method: "post",
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          login(token);
          // console.log(token);
        } else {
          console.log("Username or password is incorrect.");
        }
      });
    reset();
    authFetch("/api/protected")
      .then((response) => {
        if (response.status === 401) {
          setMessage("Username or password is incorrect.");
          return null;
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.username) {
          setMessage(response.username);
        }
      });
  };

  return (
    <>
      {!logged ? (
        <div>
          <h1 className="row central title">Login</h1>

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
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
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
              <div>
                <button className="submit-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div>
          <h3 className="row central title">Hello, {message}!</h3>
          <section className="row central">
            <button onClick={() => logout()}>Logout</button>
          </section>
        </div>
      )}
    </>
  );
}
