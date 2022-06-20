import React, { useEffect, useRef, useState } from "react";
import "./tests.css";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { testsSelector } from "../../state-management/tests/selectors";
import TestCreater from "./testCreate/CreateTest";
import Test from "./testItem/Test";
import { fetchUserTestsRequest } from "../../state-management/tests/requests";

function Tests() {
  const [createTest, setCreateTest] = useState(false);
  const [inComplete, setInComplete] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTests, setShowTests] = useState(false);

  const completedRef = useRef(null);
  const inCompleteRef = useRef(null);
  const createTestRef = useRef(null);
  const showTestsRef = useRef(null);

  const { userTests } = useSelector(testsSelector);
  const dispatch = useDispatch();

  const {
    user: {
      role: { name },
      id,
      userTest,
    },
    loading,
  } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchUserTestsRequest(id));
    setTimeout(() => {
      if (name === "Student") {
        setInComplete(true);
      } else {
        setShowTests(true);
      }
    }, 1000);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
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
              Incomplete
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
              Completed
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
            {userTests?.map((test, index) => {
              if (userTest[index].isComplete === false) {
                return <Test {...test} key={test.id} />;
              }
            })}
          </div>
        )}
        {completed && (
          <div>
            {userTests?.map((test, index) => {
              const mark = userTest[index].mark;
              if (userTest[index].isComplete === true) {
                return <Test {...test} mark={mark} key={test.id} />;
              }
            })}
          </div>
        )}
        {showTests && (
          <div>
            {userTests?.map((test) => {
              return <Test {...test} key={test.id} teacher />;
            })}
          </div>
        )}
        {createTest && <TestCreater />}
      </div>
    </div>
  );
}

export default Tests;
