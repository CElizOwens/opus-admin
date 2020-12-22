import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form({ venueFormSubmit }) {
  const { register, handleSubmit, errors, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    venueFormSubmit(data);
    reset();
  };
  const handleToggle = () => {
    setNeedForm(!needForm);
  };

  return (
    <div className="card">
      {needForm ? (
        <>
          <div className="closing-toggle">
            <button className="toggler" onClick={handleToggle}>
              <i className="fas fa-minus"></i>
            </button>{" "}
            Close
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-div hori-control">
                <label>Name</label>
                <input type="text" name="name" ref={register} />
              </div>
              <div className="form-div hori-control">
                <label>Address</label>
                <input type="text" name="address" ref={register} />
              </div>
              <div className="form-div hori-control">
                <label>Website</label>
                <input type="text" name="link" ref={register} />
              </div>
              <div>
                {/* <div className="form-div hori-control"> */}
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="row">
          <button className="toggler" onClick={handleToggle}>
            <i className="fas fa-plus"></i>
          </button>
          <p>Add new venue...</p>
        </div>
      )}
    </div>
  );
}
