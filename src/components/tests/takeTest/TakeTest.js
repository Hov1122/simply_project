import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { submitTestRequest } from "../../../state-management/tests/requests";
import { motion } from "framer-motion";
import "./TakeTest.css";

const TakeTest = ({ questions, testId, testDuration: length }) => {
  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  const [questionCount, setQuestionCount] = useState(5);
  const [answers, setAnswers] = useState([]);
  const [answerValues, setAnswerValues] = useState({});
  const [hours, setHours] = useState(Math.floor(length / 60));
  const [minutes, setMinutes] = useState(
    length - hours * 60 === 0 ? length - hours * 60 : length - hours * 60 - 1
  );
  const [seconds, setSeconds] = useState(minutes === 0 ? 1 : 59);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSec) => prevSec - 1);
    }, 1000);

    submitTestHandler("Time Expired, Test Submitted");

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setMinutes((prevMin) => prevMin - 1);
      if (minutes === 0 && hours !== 0) {
        setMinutes(59);
        setHours((prevHours) => prevHours - 1);
      }

      if (minutes <= 0 && hours <= 0) {
        submitTestHandler("Time Expired, Test Submitted");
      }

      setSeconds(59);
      return;
    }
  }, [seconds]);

  const submitTestHandler = (message) => {
    dispatch(submitTestRequest({ answersIds: answers, testId }));
    navigate("/home", { state: { testSubmitted: true, message } });
  };

  return name === "Student" ? (
    <div className="Take-Test-Container">
      <span className="test-timer">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
      {questions
        .slice(questionCount - 5, questionCount)
        .map(({ id, name, answers }) => {
          return (
            <motion.div
              initial={{ x: "100vw" }}
              animate={{
                x: 0,
                transition: { ease: "easeInOut", duration: 0.5 },
              }}
              key={id}
              className="Question-Container"
            >
              <h2>Question {questions.findIndex((q) => q.id === id) + 1}</h2>
              <span className="question-text">{name}</span>
              <div className="Answers-Container">
                {answers.map(({ id, name }) => {
                  return (
                    <div key={id} className="Answer">
                      <input
                        className="answer-input"
                        type="checkbox"
                        checked={answerValues[id] || false}
                        id={id}
                        style={{ borderRadius: 10 }}
                        onChange={(e) => {
                          const { checked } = e.target;

                          setAnswerValues((prevValues) => {
                            const newValues = Object.assign({}, prevValues);
                            newValues[id] = checked;
                            return newValues;
                          });

                          if (checked) {
                            setAnswers((prev) => [...prev, id]);
                            return;
                          }

                          setAnswers((prev) => prev.filter((a) => a !== id));
                        }}
                      />
                      <label htmlFor={id} className="answer-text">
                        {name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      {questions.length <= questionCount && (
        <button
          className="submit-test"
          onClick={() => submitTestHandler("Test Submitted Successfully")}
        >
          Submit Test
        </button>
      )}
      <Pagination
        count={Math.ceil(questions.length / 5)}
        variant="outlined"
        color="primary"
        size="large"
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
