import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Opener, Closer } from "./Toggles";

export default function ProgramForm({ programFormSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getVenues() {
    try {
      setLoading(true);

      const res = await fetch("/api/venues");
      const data = await res.json();
      setLoading(false);
      // console.log(data);
      setVenues(data);
      // console.log(res);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getVenues();
    return () => {
      setVenues([]);
    };
  }, []);

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
                <label htmlFor="day_time">Date and Time</label>
                <input
                  type="text"
                  name="day_time"
                  id="day_time"
                  ref={register}
                />
              </div>
              <div className="form-div hori-control">
                <label htmlFor="venue">Venue</label>
                {/* <input type="text" name="venue" ref={register} /> */}
                <select
                  defaultValue={""}
                  name="venue"
                  id="venue"
                  ref={register}
                >
                  <option value="">Choose venue...</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
              </div>
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
        <Opener toggle={handleToggle} text="Add new program..." />
      )}
    </div>
  );
}
