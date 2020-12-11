import React, { useState, useEffect } from "react";
import Form from "./Form";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Venues() {
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

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h1 className="row central title">Venues</h1>
          <section className="form-cluster">
            <Form />
          </section>
          <section className="venue-list">
            {venues.map((venue) => (
              <div key={venue.id} className="card venue">
                <a href={venue.link} target="_blank" rel="noreferrer">
                  {venue.name}
                </a>{" "}
                {venue.address}
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
