import React, { useEffect } from "react";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./Test.css";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";

const Test = ({ name, subjectId, length, mark, questions }) => {
  const { subjects } = useSelector(subjectsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
  }, []);

  return (
    <div className="Test-Container">
      <h2>{name}</h2>
      <div className="Test-Main">
        <span>
          Subject: {subjects.find((sub) => sub.id === subjectId)?.name}
        </span>
        <span>Length: {length} minutes</span>
        {mark && (
          <span style={{ color: `${mark >= 6 ? "lightgreen" : "red"}` }}>
            Mark: {mark}
          </span>
        )}
        <span>Questions: {questions?.length}</span>
        {!mark ? (
          <button className="take-test-button">Take Test</button>
        ) : (
          <button className="check-results-button">Check Results</button>
        )}
      </div>
    </div>
  );
};

export default Test;
