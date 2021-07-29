import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Opener, Closer } from "./Toggles";

export default function ProgramForm({ programFormSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);
  const [venues, setVenues] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);

  async function getVenues() {
    try {
      //   setLoading(true);

      const res = await fetch("/api/venues");
      const data = await res.json();
      //   setLoading(false);
      // console.log(data);
      setVenues(data);
      // console.log(res);
    } catch (err) {
      //   setError(err.message);
      //   setLoading(false);
    }
  }
  useEffect(() => {
    getVenues();
    return () => {
      setVenues([]);
    };
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
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
                <label htmlFor="venue_id">Venue</label>
                <select
                  defaultValue={""}
                  name="venue_id"
                  id="venue_id"
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
              <div>
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Opener toggle={handleToggle} text="Add new event..." />
      )}
    </div>
  );
}
