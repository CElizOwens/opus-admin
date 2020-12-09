import React, { useState, useEffect } from "react";

export default function Time() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    async function getTime() {
      const res = await fetch("/api/time");

      const data = await res.json();
      // console.log(data);
      setCurrentTime(data.time);
    }
    getTime();
  }, []);

  return (
    <section className="card">
      <h1>Current Time</h1>
      <ul>
        <li>{currentTime} PST</li>
        <li>(3 hour ahead) EST</li>
        <li>(9 hours ahead) Germany</li>
      </ul>
    </section>
  );
}
