import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { fetchTestResults } from "../../../state-management/tests/requests";
import { testsSelector } from "../../../state-management/tests/selectors";
import "./CheckResults.css";

const CheckResults = () => {
  const {
    state: { testId },
  } = useLocation();

  const {
    user: { id },
  } = useSelector(authSelector);
  const { testResults } = useSelector(testsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTestResults({ userId: id, testId }));
  }, []);

  return (
    <div className="Check-Results-Container">
      {testResults?.map((result) => {
        console.log(result, "result");
        return <div className="Result-Container" key={result.id}></div>;
      })}
    </div>
  );
};

export default CheckResults;
