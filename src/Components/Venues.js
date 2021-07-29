import React, { useState, useEffect, useCallback } from "react";
import VenueForm from "./VenueForm";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submitVenBool, setSubmitVenBool] = useState(false);

  const handleFormSubmit = (data) => {
    fetch("api/venues", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setSubmitVenBool(!submitVenBool);
  };

  const getVenues = useCallback(() => {
    setLoading(true);
    return fetch("/api/venues")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
        setVenues([...data]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getVenues();
    return () => {
      setVenues([]);
    };
  }, [getVenues, submitVenBool]);

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
            <VenueForm venueFormSubmit={handleFormSubmit} />
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
