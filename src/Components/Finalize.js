import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

function Finalize() {
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  const emailAddress = useRef({});
  password.current = watch("password", "");

  const onSubmit = () => {};

  useEffect(() => {
    // effect;
    return () => {
      // cleanup;
    };
  }, []);

  return (
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
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Finalize;
