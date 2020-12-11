import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {/* {props.children} */}
      An error has occurred. Refresh or click back button.
    </div>
  );
}
