import React, { useState, useEffect } from "react";

const SideClock = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // 초 업데이트
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 시간 포맷 설정
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // 날짜 포맷 설정
  const dateOptions: Intl.DateTimeFormatOptions = {
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
