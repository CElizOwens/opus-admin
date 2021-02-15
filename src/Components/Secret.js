import { useEffect, useState } from "react";
import { authFetch } from "../auth";

export default function Secret() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    authFetch("/api/protected")
      .then((response) => {
        if (response.status === 401) {
          setMessage("Sorry, you are not authorized!");
          return null;
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.message) {
          setMessage(response.message);
        }
      });
  }, []);

  return <h2>Secret: {message}</h2>;
}
