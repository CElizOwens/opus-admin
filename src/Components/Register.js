// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// function Register() {
//   const { register, handleSubmit, errors, reset } = useForm();
//   const [emailed, setEmailed] = useState(false);
//   const [message, setMessage] = useState("");

//   const onSubmit = (data) => {
//     console.log("User info has been submitted.");
//     let opts = {
//       username: data.email,
//       password: data.password,
//     };
//     // console.log(opts);
//     fetch("/api/register", {
//       method: "POST",
//       body: JSON.stringify(opts),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           setMessage(res.statusText);
//           return null;
//         } else {
//           setEmailed(true);
//         }
//         return res.json();
//       })
//       .then((r) => console.log(r))
//       .then((r) => {
//         if (r && r.message) {
//           setMessage(r.message);
//         }
//       })
//       .catch((err) => console.log(err));
//     //   .then((token) => {
//     //     if (token.access_token) {
//     //       login(token);
//     // console.log(token);
//     // } else {
//     //   console.log("Please enter a valid username/password.");
//     // }
//     //   });
//     reset();
//   };

//   return (
//     <>
//       {emailed ? (
//         <h2>{message}</h2>
//       ) : (
//         <div>
//           <h1 className="row central title">Create Account</h1>

//           <section className="row central">
//             <form className="login" onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-div vert-control">
//                 <label htmlFor="email">Enter Email</label>

//                 <input
//                   type="text"
//                   name="email"
//                   autoComplete="username"
//                   ref={register({
//                     required: "*Email is required.",
//                     pattern: {
//                       value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                       message: "*Email is not valid.",
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <p className="danger">{errors.email.message}</p>
//                 )}
//               </div>
//               <div className="form-div vert-control">
//                 <label htmlFor="password">Create Password</label>

//                 <input
//                   type="password"
//                   name="password"
//                   autoComplete="current-password"
//                   ref={register({
//                     required: "*Password is required.",
//                     minLength: {
//                       value: 6,
//                       message: "*Password must be at least 6 characters.",
//                     },
//                   })}
//                 />
//                 {errors.password && (
//                   <p className="danger">{errors.password.message}</p>
//                 )}
//               </div>
//               <div>
//                 <button className="submit-btn" type="submit">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}
//     </>
//   );
// }

// export default Register;
