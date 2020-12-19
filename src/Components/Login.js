import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className="danger">*Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="danger">*Email is not valid.</p>
            )}
          </div>
          <div className="form-div vert-control">
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              name="password"
              ref={register({ required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="danger">*Password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="danger">
                *Password should be at-least 6 characters.
              </p>
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
