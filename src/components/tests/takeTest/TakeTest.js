import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { submitTestRequest } from "../../../state-management/tests/requests";
import { motion } from "framer-motion";
import { useBlocker } from "../../../helpers/hooks/useBlocker";
import "./TakeTest.css";

const TakeTest = ({ questions, testId, testDuration: length }) => {
  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [blocking, setBlocking] = useState(true);
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

  useBlocker(() => {
    setConfirmOpen(true);

    const yes = window.confirm(
      "Are you sure you want to leave this page? Your test will be submitted!"
    );

    if (!yes) {
      setConfirmOpen(false);
      return;
    }

    setBlocking(false);

    setTimeout(() => {
      submitTestHandler("You left the page, Test submitted!");
    }, 500);
  }, blocking);

  useEffect(() => {
    document.addEventListener("visibilitychange", tabChange);

    const intervalId = setInterval(() => {
      setSeconds((prevSec) => prevSec - 1);
    }, 1000);

    if (length <= 0) {
      submitTestHandler("Time Expired, Test Submitted");
    }

    return () => {
      document.removeEventListener("visibilitychange", tabChange);
      clearInterval(intervalId);
    };
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

  const tabChange = () => {
    if (document.visibilityState !== "visible" && !confirmOpen) {
      setBlocking(false);

      setTimeout(() => {
        submitTestHandler("You left the page, Test submitted!");
      }, 500);
    }
  };

  const submitTestHandler = (message) => {
    dispatch(submitTestRequest({ answersIds: answers, testId }));
    navigate("/home", { state: { testSubmitted: true, message } });
  };

  return name === "Student" ? (
    <div style={{ width: "100%" }}>
      <div style={{ height: 75 }}></div>
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
            onClick={() => {
              setBlocking(false);

              setTimeout(() => {
                submitTestHandler("Test Submitted Successfully");
              }, 500);
            }}
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
    </div>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default TakeTest;
