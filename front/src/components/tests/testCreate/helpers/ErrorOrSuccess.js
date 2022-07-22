import { Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { testsSelector } from "../../../../state-management/tests/selectors";

const ErrorOrSuccess = ({ successMessage }) => {
  const { error } = useSelector(testsSelector);
  if (error)
    return (
      <Alert severity="error" sx={{ margin: "15px auto" }}>
        {"Something went wrong.Check all fields and try again."}
      </Alert>
    );
  return (
    <Alert severity="success" sx={{ margin: "15px auto" }}>
      {successMessage}
    </Alert>
  );
};

export default ErrorOrSuccess;
