import React, { useEffect, useState } from "react";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./Test.css";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import Loading from "../../common/Loading";

const Test = ({
  name,
  subjectId,
  length,
  mark,
  questions,
  createdAt,
  teacher,
  setTakeTest,
  setCurrentQuestions,
}) => {
  const [loading, setLoading] = useState(true);

  const { subjects } = useSelector(subjectsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjectsRequest());

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
        <span>Length: {length} minutes</span>
        {mark && (
          <span style={{ color: `${mark >= 6 ? "lightgreen" : "red"}` }}>
            Mark: {mark}
          </span>
        )}
        <span>Questions: {questions?.length}</span>
        {!teacher ? (
          !mark ? (
            <button
              className="take-test-button"
              onClick={() => {
                setTakeTest(true);
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
