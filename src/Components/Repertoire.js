import React, { useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Repertoire() {
  const [rep, setRep] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getRep() {
    try {
      setLoading(true);

      const res = await fetch("/api/repertoire");
      const data = await res.json();
      setLoading(false);
      // console.log(data);
      setRep(data);
      // console.log(res);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getRep();
    return () => {
      setRep([]);
    };
  }, []);

  return (
    <div>
      <h1 className="row central title">Repertoire</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <section>
            {rep.map((performance, index) => (
              <div key={index} className="card card-div rep-div">
                <h3>{performance.name}</h3>
                <p>
                  <span>IMSLP Title: </span>
                  {performance.title}
                </p>
                <p>
                  <span>Performance Notes: </span>
                  {performance.notes}
                </p>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
