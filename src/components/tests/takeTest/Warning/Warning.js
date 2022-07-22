import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./Warning.css";

const Warning = ({ setShowWarning }) => {
  const warningRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", closeWarning);
    }, 1000);

    return () => document.removeEventListener("click", closeWarning);
  });

  const closeWarning = (e) => {
    if (warningRef?.current?.contains(e.target) || !warningRef) return;

    setShowWarning(false);
  };

  return (
    <div className="Message" ref={warningRef}>
      <div className="Message-icon">
        <i className="fa fa-bell-o"></i>
      </div>
      <div className="Message-body">
        <p>
          Your test will be submitted, if you leave this page or your browser!
        </p>
      </div>
      <button
        className="Message-close js-messageClose"
        onClick={() => setShowWarning(false)}
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default Warning;
