import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Opener, Closer } from "./Toggles";

export default function PerformanceForm({ event_id, performanceFormSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);
  const [composers, setComposers] = useState([]);
  const [compRep, setCompRep] = useState([]);

  async function getComposers() {
    try {
      //   setLoading(true);

      const res = await fetch("/api/composers");
      const data = await res.json();
      //   setLoading(false);
      // console.log(data);
      setComposers(data);
      // console.log(res);
    } catch (err) {
      //   setError(err.message);
      //   setLoading(false);
    }
  }

  async function getCompRep(name) {
    try {
      //   console.log("Inside getCompRep(" + name + ")");
      const res = await fetch(`/api/composer_pieces/${name}`);
      const data = await res.json();
      setCompRep(data);
    } catch (err) {}
  }

  useEffect(() => {
    getComposers();
    return () => {
      setComposers([]);
    };
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(event_id);
    const id = event_id;
    performanceFormSubmit(data, id);
    reset();
  };

  const handleName = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    getCompRep(e.target.value);
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
                {/* <label htmlFor="composer">Composer</label>
                <input
                  type="text"
                  name="composer"
                  id="composer"
                  ref={register}
                /> */}
                <label htmlFor="composer">Composer</label>
                {/* <input type="text" name="composer" ref={register} /> */}
                <select
                  defaultValue={""}
                  name="composer"
                  id="composer"
                  onChange={handleName}
                  ref={register}
                >
                  <option value="">Choose composer...</option>
                  {/* 31606 composers */}
                  {composers.map((composer) => (
                    <option key={composer.id} value={composer.name}>
                      {composer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-div hori-control">
                <label htmlFor="imslp_title">IMSLP Title</label>
                {/* <input
                  type="text"
                  name="imslp_title"
                  id="imslp_title"
                  ref={register}
                /> */}
                <select
                  defaultValue={""}
                  name="imslp_title"
                  id="imslp_title"
                  ref={register}
                >
                  <option value="">Choose piece...</option>
                  {compRep.map((piece) => (
                    <option key={piece.id} value={piece.title}>
                      {piece.title}
                    </option>
                  ))}
                </select>
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
