// import React from "react";
// import { useForm } from "react-hook-form";
// import { login, useAuth, logout } from "../auth";

function ScratchFinalize() {
  //   const { register, handleSubmit, errors, reset } = useForm();
  //   const onSubmit = (data) => {
  //     console.log("You pressed the register button.");
  //     let opts = {
  //       username: data.email,
  //       password: data.password,
  //     };
  //     // console.log(opts);
  //     fetch("/api/finalize", {
  //       method: "post",
  //       body: JSON.stringify(opts),
  //     })
  //       .then((r) => r.json())
  //       .then((token) => {
  //         if (token.access_token) {
  //           login(token);
  //           // console.log(token);
  //         } else {
  //           console.log("Please type in correct username/password.");
  //         }
  //       });
  //     reset();
  //   };
  //   return (
  //     <div>
  //       <h1>Registration</h1>
  //       <p>
  //         Enter your email address and create a password (at least 6 characters).
  //       </p>
  //       <section className="row central">
  //         <form className="login" onSubmit={handleSubmit(onSubmit)}>
  //           <div className="form-div vert-control">
  //             <label htmlFor="email">Email</label>
  //             <input
  //               type="text"
  //               name="email"
  //               autoComplete="username"
  //               ref={register({
  //                 required: "*Email is required.",
  //                 pattern: {
  //                   value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  //                   message: "*Email is not valid.",
  //                 },
  //               })}
  //             />
  //             {errors.email && <p className="danger">{errors.email.message}</p>}
  //           </div>
  //           <div className="form-div vert-control">
  //             <label htmlFor="password">Password</label>
  //             <input
  //               type="password"
  //               name="password"
  //               autoComplete="current-password"
  //               ref={register({
  //                 required: "*Password is required.",
  //                 minLength: {
  //                   value: 6,
  //                   message: "*Password must be at least 6 characters.",
  //                 },
  //               })}
  //             />
  //             {errors.password && (
  //               <p className="danger">{errors.password.message}</p>
  //             )}
  //           </div>
  //           <div>
  //             <button className="submit-btn" type="submit">
  //               Register
  //             </button>
  //           </div>
  //         </form>
  //       </section>
  //     </div>
  //   );
}

export default ScratchFinalize;
