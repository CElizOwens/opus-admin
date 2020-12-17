import React from "react";

export default function Performances({ performances }) {
  console.log(performances);
  const perfs = performances;
  return (
    <section>
      {perfs.map((performance, index) => (
        <div key={index} className="card card-div perfs-div">
          <h3>{performance.name}</h3>
          <article>
            <p>
              <span>IMSLP Title: </span>
              {performance.title}
            </p>
            <p>
              <span>Performance Notes: </span>
              {performance.notes}
            </p>
          </article>
        </div>
      ))}
    </section>
  );
}
