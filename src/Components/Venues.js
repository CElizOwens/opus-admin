import React, { useState, useEffect } from "react";

export default function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getVenues() {
      const res = await fetch("/api/venues");
      const data = await res.json();
      // console.log(data);
      setVenues(data);
      // console.log(res);
    }
    getVenues();
  }, []);

  return (
    <div>
      <h1 className="row central title">Venues</h1>
      {venues.map((venue) => (
        <section key={venue.id} className="card venue">
          <a href={venue.link} target="_blank" rel="noreferrer">
            {venue.name}
          </a>{" "}
          {venue.address}
        </section>
      ))}
    </div>
  );
}
