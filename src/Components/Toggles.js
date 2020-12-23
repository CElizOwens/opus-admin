import React, { useState } from "react";

export default function Opener({ text }) {
  // const [needForm, setNeedForm] = useState(false);
  // const handleToggle = () => {
  //   setNeedForm(!needForm);
  // };
  return (
    <div className="row">
      <button className="toggler" onClick={handleToggle}>
        <i className="fas fa-plus"></i>
      </button>
      <p>{text}</p>
    </div>
  );
}

export function Closer() {
  return (
    <div className="closing-toggle">
      <button className="toggler" onClick={handleToggle}>
        <i className="fas fa-minus"></i>
      </button>{" "}
      Close
    </div>
  );
}
