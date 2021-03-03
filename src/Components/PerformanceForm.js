import React, { useState, useEffect } from "react";
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
  // const [composers, setComposers] = useState([]);
  // const composers = composers;
  const [compRep, setCompRep] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // async function getComposers() {
  //   try {
  //     // setLoading(true);

  //     const res = await fetch("/api/composers");
  //     const data = await res.json();
  //     // setLoading(false);
  //     console.log(data);
  //     setComposers(data);
  //     // composers = data;
  //     // console.log(res);
  //   } catch (err) {
  //     // setError(err.message);
  //     // setLoading(false);
  //   }
  // }

  async function getCompRep(name) {
    try {
      //   console.log("Inside getCompRep(" + name + ")");
      const res = await fetch(`/api/composer_pieces/${name}`);
      const data = await res.json();
      setCompRep(data);
    } catch (err) {}
  }

  // useEffect(() => {
  //   getComposers();
  //   return () => {
  //     setComposers([]);
  //   };
  // }, []);

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

  useEffect(() => {}, []);

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
                  <option value="">Type or scroll to search...</option>
                  {/* 31606 composers */}
                  {/* {composers1.current.map((composer) => (
                    <option key={composer.id} value={composer.name}>
                      {composer.name}
                    </option>
                  ))} */}
                  {compOptions}
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
      {/* </>
      )} */}
    </div>
  );
}
