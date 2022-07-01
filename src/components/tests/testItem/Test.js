import React, { useEffect, useState } from "react";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./Test.css";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";

const Test = ({
  id,
  name,
  subjectId,
  length,
  mark,
  questions,
  createdAt,
  teacher,
  start,
  setTakeTest,
  setCurrentQuestions,
  setTestId,
  setTestDuration,
}) => {
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState();

  const { subjects } = useSelector(subjectsSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    const date = new Date();
    const timeDifference =
      date.setTime(date.getTime() + 4 * 60 * 60 * 1000) - new Date(start);

    if (timeDifference > 0) {
      setTestStarted(true);
      setTestDuration((prevDurations) => {
        const newDurations = Object.assign({}, prevDurations);
        newDurations[id] = length - Math.floor(timeDifference / 1000 / 60);
        return newDurations;
      });
      setTimeLeft(length - Math.floor(timeDifference / 1000 / 60));
    }

    setInterval(() => {
      const date = new Date();

      const timeDifference =
        date.setTime(date.getTime() + 4 * 60 * 60 * 1000) - new Date(start);

      if (timeDifference > 0) {
        setTestStarted(true);
        setTestDuration(length - Math.floor(timeDifference / 1000 / 60));
        setTimeLeft(length - Math.floor(timeDifference / 1000 / 60));
      }
    }, 30000);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Test-Container">
      <h2>{name}</h2>
      <div className="Test-Main">
        <span>
          Subject: {subjects?.find((sub) => sub.id === subjectId)?.name}
        </span>
        <span>Duration: {length} minutes</span>
        {mark !== -1 ? (
          <span style={{ color: `${mark >= 6 ? "lightgreen" : "red"}` }}>
            Mark: {mark?.toFixed(2)}
          </span>
        ) : null}
        {mark === -1 && timeLeft ? (
          timeLeft >= 0 ? (
            <span>Time Left: {timeLeft} minutes</span>
          ) : (
            <span>Test Ended</span>
          )
        ) : null}
        <span>Questions: {questions?.length}</span>
        {!testStarted ? (
          <span>Starts At: {new Date(start).toUTCString()}</span>
        ) : !teacher ? (
          mark === -1 ? (
            <button
              className="take-test-button"
              onClick={() => {
                setTakeTest(true);
                setTestId(id);
                setCurrentQuestions(questions);
              }}
            >
              Take Test
            </button>
          ) : (
            <button
              className="check-results-button"
              onClick={() =>
                navigate("/test/result", { state: { testId: id } })
              }
            >
              Check Results
            </button>
          )
        ) : (
          <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default Test;
