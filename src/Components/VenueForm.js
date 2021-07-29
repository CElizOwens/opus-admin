import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Closer, Opener } from "./Toggles";

export default function Form({ venueFormSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
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
          <Closer toggle={handleToggle} />
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
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Opener toggle={handleToggle} text="Add new venue..." />
      )}
    </div>
  );
}
