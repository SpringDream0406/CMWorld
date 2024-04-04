import React, { useState, useEffect } from "react";

const SideClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const dateOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="sideTime-box">
      <span className="nowTime">
        {currentTime.toLocaleTimeString(undefined, timeOptions)}
      </span>
      <span>{currentTime.toLocaleDateString(undefined, dateOptions)}</span>
    </div>
  );
};

export default SideClock;
