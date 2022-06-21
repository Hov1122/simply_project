import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import "./TakeTest.css";

const TakeTest = ({ questions }) => {
  const [questionCount, setQuestionCount] = useState(5);
  const [answers, setAnswers] = useState([]);

  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  const navigate = useNavigate();

  return name === "Student" ? (
    <div className="Take-Test-Container">
      {questions
        .slice(questionCount - 5, questionCount)
        .map(({ id, name, answers }) => {
          return (
            <div key={id} className="Question-Container">
              <h2>Question {questions.findIndex((q) => q.id === id) + 1}</h2>
              <span>{name}</span>
              <div className="Answers-Container">
                {answers.map(({ id, name }) => {
                  return (
                    <div key={id} className="Answer">
                      <input
                        type="checkbox"
                        id={id}
                        style={{ borderRadius: 10 }}
                        onChange={(e) => {
                          const { checked } = e.target;

                          if (checked) {
                            setAnswers((prev) => [...prev, id]);
                            return;
                          }

                          setAnswers((prev) => prev.filter((a) => a !== id));
                        }}
                      />
                      <label htmlFor={id}>{name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      {questions.length <= questionCount && (
        <button
          className="submit-test"
          onClick={() => {
            console.log(answers);
            navigate("/home", { state: { testSubmitted: true } });
          }}
        >
          Submit Test
        </button>
      )}
      <Pagination
        count={Math.ceil(questions.length / 5)}
        variant="outlined"
        color="primary"
        onChange={(e, value) => {
          setQuestionCount(value * 5);
        }}
      />
    </div>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default TakeTest;
