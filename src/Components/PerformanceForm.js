import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Opener, Closer } from "./Toggles";

export default function PerformanceForm() {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);

  const handleToggle = () => {
    setNeedForm(!needForm);
  };

  return (
    <div className="card">
      {needForm ? (
        <>
          <Closer toggle={handleToggle} />
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form>
              <div className="form-div hori-control">
                <label htmlFor="composer">Composer</label>
                <input
                  type="text"
                  name="composer"
                  id="composer"
                  ref={register}
                />
              </div>
              <div className="form-div hori-control">
                <label htmlFor="imslp_title">IMSLP Title</label>
                <input
                  type="text"
                  name="imslp_title"
                  id="imslp_title"
                  ref={register}
                />
              </div>
              <div className="form-div hori-control">
                <label htmlFor="performance_notes">Performance Notes</label>
                <input
                  type="text"
                  name="performance_notes"
                  id="performance_notes"
                  ref={register}
                />
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
        <Opener toggle={handleToggle} text="Add new performance..." />
      )}
    </div>
  );
}
