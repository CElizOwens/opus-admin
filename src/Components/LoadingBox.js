import React from "react";
// import spinner from "../Images/icons8-refresh.gif";

export default function LoadingBox() {
  return (
    <div>
      <img src="fas fa-spinner fa-spin" alt="spinner..." />
      {/* <img src={require("../Images/icons8-refresh.gif")} alt="spinner..." />{" "} */}
      Loading...
    </div>
  );
}
