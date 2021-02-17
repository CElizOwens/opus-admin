import React from "react";
import { useForm } from "react-hook-form";
import { login, useAuth, logout } from "../auth";

export default function Login({ loggingStatus }) {
  const { register, handleSubmit, errors, reset } = useForm();
  const [logged] = useAuth();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const onSubmit = (data) => {
    console.log("You pressed login");
    let opts = {
      username: data.email,
      password: data.password,
    };
    console.log(opts);
    fetch("/api/login", {
      method: "post",
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          login(token);
          console.log(token);
        } else {
          console.log("Please type in correct username/password.");
        }
      });
    reset();
  };

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  return (
    <>
      {!logged ? (
        <div>
          <h1 className="row central title">Admin Login</h1>

          <section className="row central">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-div vert-control">
                <label htmlFor="email">Email</label>

                <input
                  type="text"
                  name="email"
                  // onChange={handleUsernameChange}
                  // value={username}
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
                  // onChange={handlePasswordChange}
                  // value={password}
                  ref={register({
                    required: "*Password is required.",
                    minLength: {
                      value: 6,
                      message: "*Password must be at least 6 characters.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="danger">{errors.password.message}</p>
                )}
              </div>
              <div>
                {/* <div className="form-control"> */}
                <button className="submit-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div>
          <h2 className="row central title">You are logged in!</h2>
          <section className="row central">
            <button onClick={() => logout()}>Logout</button>
          </section>
        </div>
      )}
    </>
  );
}
