import React from "react";
import { useAuth } from "../auth";

export function Opener({ toggle, text }) {
  const [logged] = useAuth();

  return (
    <>
      {!logged ? (
        <div className="row">
          <button className="toggler">
            <i className="fas fa-plus"></i>
          </button>
          <p>
            <i>Login required</i>
          </p>
        </div>
      ) : (
        <div className="row">
          <button className="toggler slow-btn" onClick={toggle}>
            <i className="fas fa-plus"></i>
          </button>
          <p>{text}</p>
        </div>
      )}
    </>
  );
}

export function Closer({ toggle }) {
  return (
    <div className="closing-toggle">
      <button className="toggler" onClick={toggle}>
        <i className="fas fa-minus"></i>
      </button>{" "}
      Close
    </div>
  );
}
