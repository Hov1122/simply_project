import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import "./TakeTest.css";

const TakeTest = () => {
  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  const { state } = useLocation();

  return name === "Student" && state ? (
    <div className="Take-Test-Container">
      {state?.questions?.map(({ id, name, answers }, index) => {
        return (
          <div key={id} className="Question-Container">
            <h2>Question {index + 1}</h2>
            <span>{name}</span>
            <div className="Answers-Container">
              {answers.map(({ id, name }) => {
                return (
                  <div key={id} className="Answer">
                    <input
                      type="checkbox"
                      id={id}
                      style={{ borderRadius: 10 }}
                    />
                    <label htmlFor={id}>{name}</label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default TakeTest;
