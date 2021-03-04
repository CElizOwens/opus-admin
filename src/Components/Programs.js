import React, { useState, useEffect, useCallback, useRef } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import PerformanceForm from "./PerformanceForm";
import Performances from "./Performances";
import ProgramForm from "./ProgramForm";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [submitPerfBool, setSubmitPerfBool] = useState(false);
  // const [submitProgBool, setSubmitProgBool] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // let eventDetails = useRef([]);
  // let resDict = useRef([]);

  let program_id = useRef(null);
  let compOpts = useRef([]);

  // const getNewEventID = (eventDets) => {
  //   return fetch("api/ProgramID", {
  //     method: "POST",
  //     body: eventDets,
  //     // body: JSON.stringify({ eventDets }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  // };

  const handleProgramFormSubmit = (data) => {
    console.log('Begin "handleProgramFormSubmit:"');
    console.log(`RAW PROGRAM FORM DATA: ${JSON.stringify({ data })}`);
    // eventDetails.current.push(JSON.stringify({ data }));
    // console.log(`eventDetails = ${eventDetails}`);
    // console.log(`eventDetails.current = ${eventDetails.current}`);
    setLoading(true);
    return (
      // THIS IS NEEDS TO BE EDITTED
      // Sending to new_program
      // receive event_id
      // call get_programs with event_id?
      // OR don't, but assign event_id to a useRef
      fetch("api/new_program", {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(`non-JSONified result: ${res}`);
          return res.json();
        })
        .then((data) => {
          console.log(
            `JSONified "data" return from "api/new_program": ${data.event_id}`
          );
          program_id.current = `#id${data.event_id}`;
          // console.log("handleProgramFormSubmit now setting 'programs'.");
          setLoading(false);
          // setPrograms([...data]);
        })
        .then(setSubmitPerfBool(!submitPerfBool))
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        })
    );

    // setSubmitProgBool(!submitProgBool);
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
    setSubmitPerfBool(!submitPerfBool);
    // getPrograms();
  };

  const getPrograms = useCallback(() => {
    setLoading(true);
    return fetch("/api/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(`Inside getPrograms, before "setPrograms" call: ${data}`);
        setLoading(false);
        setPrograms([...data]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getPrograms().then(() => {
      console.log(`program_id.current = ${program_id.current}`);
      // if (program_id.current !== null) {
      if (program_id.current) {
        const section = document.getElementById("program_section");
        const prog = section.querySelector(program_id.current);
        console.log(`prog = ${prog}`);
        // if (prog !== null) {
        if (prog) {
          prog.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        program_id.current = null; // Is this necessary?
      }
    });
    return () => {
      setPrograms([]);
    };
  }, [getPrograms, submitPerfBool, program_id]);

  useEffect(() => {
    async function getComposers() {
      try {
        // setLoading(true);

        const res = await fetch("/api/composers");
        const data = await res.json();
        // setLoading(false);
        // console.log(data);
        const dLen = Object.keys(data).length;
        // composers = data;
        console.log(data[0]);

        // mapping composer data to option tags
        // in two halves, otherwise reactDevTools
        // warning 'Exceeded maximum callstack length'
        // via react's shouldFilterFiber method
        compOpts.current.push(
          data.slice(1, dLen / 2).map((composer) => (
            <option key={composer.id} value={composer.name}>
              {composer.name}
            </option>
          ))
        );
        compOpts.current.push(
          data.slice(dLen / 2, dLen).map((composer) => (
            <option key={composer.id} value={composer.name}>
              {composer.name}
            </option>
          ))
        );
        console.log(`compOpts = ${compOpts}`);
        // console.log(res);
      } catch (err) {
        console.log(err);
        // setError(err.message);
        // setLoading(false);
      }
    }
    getComposers();
  }, [compOpts]);

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
          <section id="program_section">
            {programs.map((program) => (
              <div key={program.event.id} id={`id${program.event.id}`}>
                <h1 className="heading central">
                  {program.event.name} {program.event.day_time}
                </h1>
                <PerformanceForm
                  event_id={program.event.id}
                  performanceFormSubmit={handlePerformanceFormSubmit}
                  compOptions={compOpts.current}
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
