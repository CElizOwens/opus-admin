import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api")
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, []);
  return <h1>Home Page</h1>;
}
