import React, { useState, useEffect, useCallback } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import PerformanceForm from "./PerformanceForm";
import Performances from "./Performances";
import ProgramForm from "./ProgramForm";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [perfSubBool, setPerfSubBool] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleProgramFormSubmit = (data) => {
    fetch("api/programs", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setPerfSubBool(!perfSubBool);
    // getPrograms();
  };

  const handlePerformanceFormSubmit = (data, id) => {
    // console.log(id);
    // console.log("From 'handlePerformanceFormSubmit':");
    // console.log(data);
    fetch(`api/performances/${id}`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log("We've gotten to 'getPrograms()'.");
    setPerfSubBool(!perfSubBool);
    // getPrograms();
  };

  // async function getPrograms() {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("/api/programs");
  //     const data = await res.json();
  //     setLoading(false);
  //     console.log("From 'getPrograms()':");
  //     console.log(data);
  //     setPrograms(data);
  //     // console.log(res);
  //     console.log(programs[0]);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // }

  const getPrograms = useCallback(() => {
    setLoading(true);
    return fetch("/api/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setPrograms([...data]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getPrograms();
    return () => {
      setPrograms([]);
    };
  }, [getPrograms, perfSubBool]);

  return (
    <div>
      <h1 className="row central title">Programs</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <section>
            <ProgramForm programFormSubmit={handleProgramFormSubmit} />
          </section>
          <section>
            {programs.map((program) => (
              <div key={program.event.id}>
                <h1 className="heading central">
                  {program.event.name} {program.event.day_time}
                </h1>
                <PerformanceForm
                  event_id={program.event.id}
                  performanceFormSubmit={handlePerformanceFormSubmit}
                />
                <Performances performances={program.performances} />
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
