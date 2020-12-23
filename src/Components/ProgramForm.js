import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Opener, Closer } from "./Toggles";

export default function ProgramForm({ programFormSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    programFormSubmit(data);
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
                <label>Date and Time</label>
                <input type="text" name="day_time" ref={register} />
              </div>
              <div className="form-div hori-control">
                <label>Venue</label>
                <input type="text" name="venue" ref={register} />
              </div>
              <div className="form-div hori-control">
                <label>Performance</label>
                <input type="text" name="performance" ref={register} />
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
        <Opener toggle={handleToggle} text="Add new program..." />
      )}
    </div>
  );
}
