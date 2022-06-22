import React, { useEffect, useState } from "react";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./Test.css";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
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
}) => {
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

  const { subjects } = useSelector(subjectsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjectsRequest());

    setInterval(() => {
      console.log(new Date().toUTCString() - new Date(start).toUTCString());
      new Date().toUTCString() - new Date(start).toUTCString() > 0
        ? setTestStarted(true)
        : null;
    }, 60000);

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
            <button className="check-results-button">Check Results</button>
          )
        ) : (
          <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default Test;
