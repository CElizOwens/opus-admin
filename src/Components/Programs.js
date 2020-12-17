import React, { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getPrograms() {
    try {
      setLoading(true);
      const res = await fetch("/api/programs");
      const data = await res.json();
      setLoading(false);
      console.log(data);
      setPrograms(data);
      // console.log(res);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPrograms();
    return () => {
      setPrograms([]);
    };
  }, []);

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
            {programs.map((program) => (
              <div key={program.event.id}>
                <h2>
                  {program.event.name} {program.event.day_time}
                </h2>
                <section>
                  {program.performances.map((performance, index) => (
                    <p key={index} className="card card-div">
                      {performance.name}: {performance.title}.{" "}
                      <em>{performance.notes}</em>
                    </p>
                  ))}
                </section>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
