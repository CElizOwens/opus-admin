import React, { useState, useEffect } from "react";

export default function Venues() {
  const [venues, setVenues] = useState([]);

  async function getVenues() {
    const res = await fetch("/api/venues");
    const data = await res.json();
    // console.log(data);
    setVenues(data);
    // console.log(res);
  }
  useEffect(() => {
    getVenues();
    return () => {
      setVenues([]);
    };
  }, []);

  return (
    <div>
      <h1 className="row central title">Venues</h1>
      <section className="form-cluster">Forms will go here.</section>
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
    </div>
  );
}
