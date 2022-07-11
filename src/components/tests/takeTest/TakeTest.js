import { Pagination } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { submitTestRequest } from "../../../state-management/tests/requests";
import { motion } from "framer-motion";
import { useBlocker } from "../../../helpers/hooks/useBlocker";
import "./TakeTest.css";
import TestCountDown from "./TestCountDown/TestCountDown";
import Warning from "./Warning/Warning";

const TakeTest = ({ questions, testId, testDuration: length }) => {
  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  const [showWarning, setShowWarning] = useState(true);
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

  const submitBtnRef = useRef();

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

    setTimeout(() => {
      navigate("/home", { state: { testSubmitted: true, message } });
    }, 1000);
  };

  return name === "Student" ? (
    <div style={{ width: "100%" }}>
      {showWarning && <Warning setShowWarning={setShowWarning} />}
      <div style={{ height: 75 }}></div>
      <div className="Take-Test-Container">
        <TestCountDown hours={hours} minutes={minutes} seconds={seconds} />
        {questions
          .slice(questionCount - 5, questionCount)
          .map(({ id, name, answers, isMultiSelect }) => {
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
                <span className="question-text">
                  {questions.findIndex((q) => q.id === id) + 1}. {name}
                </span>
                {isMultiSelect && <span>Multiple Choice</span>}
                <div className="Answers-Container">
                  {answers.map(({ id, name }) => {
                    return (
                      <label htmlFor={id} key={id}>
                        <div
                          className={
                            "Answer " +
                            (answerValues[id] ? "picked-answer" : "")
                          }
                          onClick={(e) =>
                            e.target.classList.toggle("picked-answer")
                          }
                        >
                          <label htmlFor={id} className="answer-text">
                            {name}
                          </label>
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

                              setAnswers((prev) =>
                                prev.filter((a) => a !== id)
                              );
                            }}
                          />
                        </div>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        {questions.length <= questionCount && (
          <div
            className="btn-container"
            onClick={() => {
              submitBtnRef?.current.classList.add("submit");
              setBlocking(false);

              setTimeout(() => {
                submitTestHandler("Test Submitted Successfully");
              }, 4000);
            }}
          >
            <div className="btn" ref={submitBtnRef}>
              <svg>
                <rect x="0" y="0" fill="none" width="160" height="40"></rect>
              </svg>{" "}
              <span>Submit</span> <span>loading</span> <span>Submitted</span>
            </div>
          </div>
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
