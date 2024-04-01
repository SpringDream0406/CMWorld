import React, { useState, useEffect } from "react";

const SideClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 컴포넌트가 언마운트 될 때 clearInterval 호출하여 interval 해제
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

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
    <div>
      <p>{currentTime.toLocaleTimeString(undefined, timeOptions)}</p>
      <p>{currentTime.toLocaleDateString(undefined, dateOptions)}</p>
    </div>
  );
};

export default SideClock;
