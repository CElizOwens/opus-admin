import React from "react";

export default function Form() {
  return (
    <div>
      <form>
        <input label="Name" />
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
}
