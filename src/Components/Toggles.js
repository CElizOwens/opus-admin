import React from "react";

export function Opener({ toggle, text }) {
  // const [needForm, setNeedForm] = useState(false);
  // const handleToggle = () => {
  //   setNeedForm(!needForm);
  // };
  return (
    <div className="row">
      <button className="toggler" onClick={toggle}>
        <i className="fas fa-plus"></i>
      </button>
      <p>{text}</p>
    </div>
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
