import React, { useState, useEffect } from "react";
import VenueForm from "./VenueForm";
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
      <h1 className="row central title">Venues</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <section className="row central">
            <VenueForm />
          </section>
          <section className="venue-list">
            {venues.map((venue) => (
              <div key={venue.id} className="card card-div venue-div">
                <article>
                  {venue.name}
                  <p>
                    <a href={venue.link} target="_blank" rel="noreferrer">
                      website
                    </a>{" "}
                    |{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${venue.address}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      map
                    </a>
                  </p>
                </article>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
