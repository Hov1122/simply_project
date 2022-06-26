import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import {
  fetchTestById,
  fetchTestResults,
} from "../../../state-management/tests/requests";
import { testsSelector } from "../../../state-management/tests/selectors";
import "./CheckResults.css";

const CheckResults = () => {
  const {
    state: { testId },
  } = useLocation();

  const {
    user: { id },
  } = useSelector(authSelector);
  const { testResults, currentTest } = useSelector(testsSelector);
  const dispatch = useDispatch();

  setTimeout(() => {
    console.log(testResults, "results");
    console.log(currentTest, "test");
  }, 1500);

  useEffect(() => {
    dispatch(fetchTestById({ id: testId }));
    dispatch(fetchTestResults({ userId: id, testId }));
  }, []);

  return <div className="Check-Results-Container"></div>;
};

export default CheckResults;
