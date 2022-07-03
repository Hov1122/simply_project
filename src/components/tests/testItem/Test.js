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
    <div className="courses-container">
      <div className="course">
        <div className="course-preview">
          <h6>
            Subject: {subjects?.find((sub) => sub.id === subjectId)?.name}
          </h6>
          <h2>{name}</h2>
        </div>
        <div className="course-info">
          <div className="progress-container">
            <div className="progress-text">
              <div className="test-body">
                <div>
                  <h6>Questions: {questions?.length}</h6>
                  <h2>Duration: {length} minutes</h2>
                </div>
                {!testStarted ? (
                  <span className="test-starts-at">
                    Starts At: {new Date(start).toUTCString()}
                  </span>
                ) : !teacher ? (
                  mark === -1 ? (
                    <div className="test-btn-container">
                      {mark === -1 && timeLeft ? (
                        timeLeft >= 0 ? (
                          <span className="test-time-left">
                            Time Left: {timeLeft} minutes
                          </span>
                        ) : (
                          <span className="test-time-left">Test Ended</span>
                        )
                      ) : null}
                      <button
                        className="start-test-btn"
                        onClick={() => {
                          setTakeTest(true);
                          setTestId(id);
                          setCurrentQuestions(questions);
                        }}
                      >
                        Start
                      </button>
                    </div>
                  ) : (
                    <button
                      className="test-result-btn"
                      onClick={() =>
                        navigate("/test/result", { state: { testId: id } })
                      }
                    >
                      Results
                    </button>
                  )
                ) : (
                  <span>
                    Created: {new Date(createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
