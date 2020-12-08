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
      <h1>Venues</h1>
      {venues.map((venue) => (
        <p key={venue.id}>
          <a href={venue.link}>{venue.name}</a> | {venue.address}
        </p>
      ))}
    </div>
  );
}
