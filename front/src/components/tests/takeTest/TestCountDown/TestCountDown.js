import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./TestCountDown.css";

const TestCountDown = ({ hours, minutes, seconds }) => {
  const minuteSeconds = 60;
  const hourSeconds = 3600;

  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 4,
  };

  return (
    <div className="Test-Count-Down-Container">
      <CountdownCircleTimer
        {...timerProps}
        colors="lightgreen"
        duration={hours * hourSeconds}
      >
        {({ color }) => (
          <span
            style={{
              color,
              fontSize: "18px",
              font: "bold",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {hours} <span>Hours</span>
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="lightblue"
        duration={minutes * minuteSeconds}
        onComplete={() => ({
          shouldRepeat: true,
        })}
      >
        {({ color }) => (
          <span
            style={{
              color,
              fontSize: "18px",
              font: "bold",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {minutes} <span>Minutes</span>
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#EF798A"
        duration={minuteSeconds}
        onComplete={() => ({
          shouldRepeat: true,
        })}
      >
        {({ color }) => (
          <span
            style={{
              color,
              fontSize: "18px",
              font: "bold",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {seconds} <span>Seconds</span>
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default TestCountDown;
