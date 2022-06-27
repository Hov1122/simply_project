import React, { useEffect, useRef, useState } from "react";
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
  const [inComplete, setInComplete] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [testDuration, setTestDuration] = useState({});
  const [skipInComplete, setSkipInComplete] = useState(0);
  const [skipCompleted, setSkipCompleted] = useState(0);
  const [filterBy, setFilterBy] = useState({"all": true});

  const completedRef = useRef(null);
  const inCompleteRef = useRef(null);
  const createTestRef = useRef(null);
  const showTestsRef = useRef(null);

  const { userTests, count } = useSelector(testsSelector);
  const dispatch = useDispatch();
  const { subjects } = useSelector(subjectsSelector);
  useEffect(() => {
    dispatch(fetchSubjectsRequest());
  }, [])
 

  const {
    user: {
      role: { name },
      id,
    },
    loading,
  } = useSelector(authSelector);

  useEffect(() => {
    const skip = 0;
    dispatch(fetchUserTestsRequest({ isComplete: completed, id, filterBy, skip }));
    setTimeout(() => {
      if (name === "Student") {
        setInComplete(true);
      } else {
        setShowTests(true);
      }
    }, 1000);
  }, [dispatch, filterBy]);

  useEffect(() => {
    const skip = completed ? skipCompleted : skipInComplete;

    dispatch(fetchUserTestsRequest({ skip, isComplete: completed, id, filterBy }));
  }, [skipInComplete, skipCompleted, completed, filterBy]);

  if (loading) {
    return <Loading />;
  }

  if (takeTest) {
    return (
      <TakeTest
        questions={currentQuestions}
        testId={testId}
        testDuration={testDuration[testId]}
      />
    );
  }

const filterTest= ({target}) => {
  if (target.value === 'all') {
    setFilterBy({all: true})
    return
  }
  setFilterBy({'subjectId': target.value})
} 
  return (
    <div className="tests">
      <div style={{height: "75px"}}></div>
      <div className="Tests-Container">
        <select onChange={(e) => filterTest(e)}>
          <option value="all">All</option>
          <optgroup label='Subjects'>
        { subjects.map((subject) => {
            return <option key = {subject.id} value={subject.id}>{subject.name}</option>
          })}
        </optgroup>
        </select>
        <div className="Tests-Nav">
          {name === "Student" ? (
            <div className="Student-Nav">
              <span
                ref={inCompleteRef}
                className="active-link"
                onClick={() => {
                  setCompleted(false);
                  setCreateTest(false);
                  setInComplete(true);
                  inCompleteRef.current.classList.add("active-link");
                  completedRef.current.classList.remove("active-link");
                }}
              >
                Upcoming
              </span>
              <span
                ref={completedRef}
                onClick={() => {
                  setCreateTest(false);
                  setInComplete(false);
                  setCompleted(true);
                  completedRef.current.classList.add("active-link");
                  inCompleteRef.current.classList.remove("active-link");
                }}
              >
                Finished
              </span>
            </div>
          ) : (
            <div className="Teacher-Nav">
              <span
                className="active-link"
                ref={showTestsRef}
                onClick={() => {
                  setShowTests(true);
                  setCreateTest(false);
                  showTestsRef.current.classList.add("active-link");
                  createTestRef.current.classList.remove("active-link");
                }}
              >
                Tests
              </span>
              <span
                ref={createTestRef}
                onClick={() => {
                  setShowTests(false);
                  setCreateTest(true);
                  createTestRef.current.classList.add("active-link");
                  showTestsRef.current.classList.remove("active-link");
                }}
              >
                Create
              </span>
            </div>
          )}
        </div>

        <div className="Tests-Main-Container">
          {inComplete && (
            <div>
              {userTests?.map((test) => {
                if (test.isComplete === false) {
                  return (
                    <Test
                      {...test}
                      key={test.id}
                      setTakeTest={setTakeTest}
                      setCurrentQuestions={setCurrentQuestions}
                      setTestId={setTestId}
                      setTestDuration={setTestDuration}
                    />
                  );
                }
              })}
            </div>
          )}
          {completed && (
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
                      setCurrentQuestions={setCurrentQuestions}
                      setTestId={setTestId}
                      setTestDuration={setTestDuration}
                    />
                  );
                }
              })}
            </div>
          )}
          {showTests && (
            <div>
              {userTests?.map((test) => {
                return (
                  <Test
                    {...test}
                    key={test.id}
                    setTakeTest={setTakeTest}
                    setCurrentQuestions={setCurrentQuestions}
                    setTestId={setTestId}
                    setTestDuration={setTestDuration}
                    teacher
                  />
                );
              })}
            </div>
          )}
          {createTest && <TestCreater />}
        </div>
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
    </div>
  );
}

export default Tests;
