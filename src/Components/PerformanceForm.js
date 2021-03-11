import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import LoadingBox from "./LoadingBox";
// import MessageBox from "./MessageBox";
import { Opener, Closer } from "./Toggles";

export default function PerformanceForm({
  event_id,
  performanceFormSubmit,
  compOptions,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [needForm, setNeedForm] = useState(false);
  const [compRep, setCompRep] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  async function getCompRep(name) {
    try {
      //   console.log("Inside getCompRep(" + name + ")");
      const res = await fetch(`/api/composer_pieces/${name}`);
      const data = await res.json();
      setCompRep(data);
    } catch (err) {}
  }

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
      {/* {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <> */}
      {needForm ? (
        <>
          <Closer toggle={handleToggle} />
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-div hori-control">
                <label htmlFor="composer">Composer</label>
                <select
                  defaultValue={""}
                  name="composer"
                  id="composer"
                  onChange={handleName}
                  ref={register}
                >
                  <option value="">Type or scroll to search...</option>
                  {/* 31606 composers */}
                  {compOptions}
                </select>
              </div>
              <div className="form-div hori-control">
                <label htmlFor="imslp_title">IMSLP Title</label>
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
      {/* </>
      )} */}
    </div>
  );
}
