import React, { useEffect, useState } from "react";
import "./tests.css";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { testsSelector } from "../../state-management/tests/selectors";
import TestCreater from "./testCreate/CreateTest";
import Test from "./testItem/Test";
import { fetchUserTestsRequest } from "../../state-management/tests/requests";
import TakeTest from "./takeTest/TakeTest";
import { Pagination } from "@mui/material";
import { subjectsSelector } from "../../state-management/subjects/selectors";
import { fetchSubjectsRequest } from "../../state-management/subjects/requests";

function Tests() {
  const [testId, setTestId] = useState();
  const [createTest, setCreateTest] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const [testDuration, setTestDuration] = useState({});
  const [skipInComplete, setSkipInComplete] = useState(0);
  const [skipCompleted, setSkipCompleted] = useState(0);
  const [filterBy, setFilterBy] = useState({ all: true });
  const [showTests, setShowTests] = useState(false);

  const { userTests, count } = useSelector(testsSelector);
  const dispatch = useDispatch();
  const { subjects } = useSelector(subjectsSelector);
  useEffect(() => {
    dispatch(fetchSubjectsRequest());
  }, []);

  const {
    user: {
      role: { name },
      id,
    },
    loading,
  } = useSelector(authSelector);

  useEffect(() => {
    const skip = 0;
    dispatch(
      fetchUserTestsRequest({ isComplete: completed, id, filterBy, skip })
    );
    if (name === "Student") {
      setCompleted(false);
    } else {
      setShowTests(true);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserTestsRequest({ isComplete: completed, id, filterBy }));
  }, [filterBy]);

  useEffect(() => {
    const skip = completed ? skipCompleted : skipInComplete;

    dispatch(
      fetchUserTestsRequest({ skip, isComplete: completed, id, filterBy })
    );
  }, [skipInComplete, skipCompleted, completed, filterBy]);

  if (loading) {
    return <Loading />;
  }

  if (takeTest) {
    return <TakeTest testId={testId} testDuration={testDuration[testId]} />;
  }

  const filterTest = ({ target }) => {
    if (target.value === "all") {
      setFilterBy({ all: true });
      return;
    }
    setFilterBy({ subjectId: target.value });
  };

  return (
    <div className="Tests">
      <div className="Tests-bar"></div>
      <div className="Tests-Container">
        <div className="Tests-Nav">
          {name === "Student" ? (
            <div className="Student-Nav">
              <div
                className="switch-button"
                onClick={() => {
                  setCompleted((prev) => !prev);
                }}
              >
                <input
                  className="switch-button-checkbox"
                  type="checkbox"
                ></input>
                <label className="switch-button-label" htmlFor="">
                  <span className="switch-button-label-span">Upcoming</span>
                </label>
              </div>
              <select className="filter-tests" onChange={(e) => filterTest(e)}>
                <option value="all">All</option>
                <optgroup label="Subjects">
                  {subjects.slice(1).map((subject) => {
                    return (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </div>
          ) : (
            <div className="Teacher-Nav">
              <div
                className="switch-button teacher-nav-switch"
                onClick={() => {
                  if (createTest) {
                    setCreateTest(false);
                    setShowTests(true);
                  } else {
                    setCreateTest(true);
                    setShowTests(false);
                  }
                }}
              >
                <input
                  className="switch-button-checkbox"
                  type="checkbox"
                ></input>
                <label className="switch-button-label" htmlFor="">
                  <span className="switch-button-label-span">Tests</span>
                </label>
              </div>
              {!createTest && (
                <select
                  className="filter-tests"
                  onChange={(e) => filterTest(e)}
                >
                  <option value="all">All</option>
                  <optgroup label="Subjects">
                    {subjects.slice(1).map((subject) => {
                      return (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      );
                    })}
                  </optgroup>
                </select>
              )}
            </div>
          )}
        </div>

        <div className="Tests-Main-Container">
          {!completed && name === "Student" && (
            <div>
              {userTests?.map((test) => {
                if (test.isComplete === false) {
                  return (
                    <Test
                      {...test}
                      key={test.id}
                      setTakeTest={setTakeTest}
                      setTestId={setTestId}
                      setTestDuration={setTestDuration}
                    />
                  );
                }
              })}
            </div>
          )}
          {completed && name === "Student" && (
            <div>
              {userTests?.map((test) => {
                const { mark } = test;
                if (test.isComplete === true) {
                  return (
                    <Test
                      {...test}
                      mark={mark}
                      key={test.id}
                      setTakeTest={setTakeTest}
                      setTestId={setTestId}
                      setTestDuration={setTestDuration}
                    />
                  );
                }
              })}
            </div>
          )}
          {showTests && !createTest && (
            <div>
              {userTests?.map((test) => {
                return (
                  <Test
                    {...test}
                    key={test.id}
                    setTakeTest={setTakeTest}
                    setTestId={setTestId}
                    setTestDuration={setTestDuration}
                    teacher
                  />
                );
              })}
            </div>
          )}
          {createTest && !showTests && <TestCreater />}
        </div>
        {!createTest && (
          <div>
            <Pagination
              count={Math.ceil(count / 5)}
              variant="outlined"
              shape="rounded"
              size="large"
              onChange={(e, value) => {
                const skip = (value - 1) * 5;
                completed ? setSkipCompleted(skip) : setSkipInComplete(skip);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tests;
