import React, { useState } from "react";
import "./Tests.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { testsSelector } from "../../state-management/tests/selectors";
import TestCreater from "./testCreate/CreateTest";
import Test from "./testItem/Test";

function Tests() {
  const [loading] = useState(false);
  const [createTest, setCreateTest] = useState(false);
  const [inComplete, setInComplete] = useState(true);
  const [completed, setCompleted] = useState(false);

  const { tests } = useSelector(testsSelector);

  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Tests-Container">
      <div className="Tests-Nav">
        <span
          onClick={() => {
            setCompleted(false);
            setCreateTest(false);
            setInComplete(true);
          }}
        >
          Incomplete
        </span>
        <span
          onClick={() => {
            setCreateTest(false);
            setInComplete(false);
            setCompleted(true);
          }}
        >
          Completed
        </span>
        {name !== "Student" ? (
          <span
            onClick={() => {
              setInComplete(false);
              setCompleted(false);
              setCreateTest(true);
            }}
          >
            Create
          </span>
        ) : null}
      </div>

      <div className="Tests-Main-Container">
        {inComplete && (
          <div>
            {tests.map((test) => {
              if (!test.completed) {
                return <Test {...test} />;
              }
            })}
          </div>
        )}
        {completed && (
          <div>
            {tests.map((test) => {
              if (test.completed) {
                return <Test {...test} />;
              }
            })}
          </div>
        )}
        {createTest && <TestCreater />}
      </div>
    </div>
  );
}

export default Tests;
