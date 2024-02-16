import React, { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import './Welcome.css';

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    fetchData();
  }, []);

  return (
    <div className="welcome">
      <h1>
        Welcome, <span>{userName}</span>!
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;