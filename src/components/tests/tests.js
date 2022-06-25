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

function Tests() {
  const [testId, setTestId] = useState();
  const [createTest, setCreateTest] = useState(false);
  const [inComplete, setInComplete] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [testDuration, setTestDuration] = useState({});
  const [skip, setSkip] = useState(0);

  const completedRef = useRef(null);
  const inCompleteRef = useRef(null);
  const createTestRef = useRef(null);
  const showTestsRef = useRef(null);

  const { userTests, count } = useSelector(testsSelector);
  const dispatch = useDispatch();

  const {
    user: {
      role: { name },
      id,
    },
    loading,
  } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchUserTestsRequest({ isComplete: completed, id }));
    setTimeout(() => {
      if (name === "Student") {
        setInComplete(true);
      } else {
        setShowTests(true);
      }
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserTestsRequest({ skip, isComplete: completed, id }));
  }, [skip, completed]);

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

  return (
    <div className="Tests-Container">
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
          setSkip((value - 1) * 5);
        }}
      />
    </div>
  );
}

export default Tests;
