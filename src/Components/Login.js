import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    // e.target.reset();
    reset();
  };
  return (
    <div>
      <h1 className="row central title">Login</h1>
      <section className="row central">
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-div vert-control">
            <label htmlFor="email">Email</label>

            <input
              type="text"
              name="email"
              ref={register({
                required: "*Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "*Email is not valid.",
                },
              })}
            />
            {errors.email && <p className="danger">{errors.email.message}</p>}
          </div>
          <div className="form-div vert-control">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
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
  );
}
