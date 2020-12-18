import React, { useState } from "react";

export default function Form() {
  const inputTextHandler = (e) => {
    console.log(e.target.value);
  };

  const [needForm, setNeedForm] = useState(false);
  const handleToggle = () => {
    setNeedForm(!needForm);
  };

  return (
    <div className="card">
      {needForm ? (
        <div className="row">
          <button className="toggler" onClick={handleToggle}>
            <i className="fas fa-plus"></i>
          </button>
          <p>Add new venue...</p>
        </div>
      ) : (
        <>
          <div className="closing-toggle">
            <button className="toggler" onClick={handleToggle}>
              <i className="fas fa-minus"></i>
            </button>{" "}
            Close
          </div>
          <div>
            <form>
              <div className="form-control">
                <label>Name</label>
                <input type="text" name="name" onChange={inputTextHandler} />
              </div>
              <div className="form-control">
                <label>Address</label>
                <input type="text" name="address" onChange={inputTextHandler} />
              </div>
              <div className="form-control">
                <label>Website</label>
                <input type="text" name="url" onChange={inputTextHandler} />
              </div>
              <div className="form-control">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
