import React from "react";
import spinner from "../icons8-refresh.gif";

export default function LoadingBox() {
  return (
    <div>
      {/* <img src="fas fa-spinner fa-spin" alt="spinner..." /> */}
      {/* <img src={require("../icons8-refresh.gif")} alt="spinner..." /> Loading... */}
      <p>Loading...</p>
      <img src={spinner} alt="spinner" />
    </div>
  );
}
