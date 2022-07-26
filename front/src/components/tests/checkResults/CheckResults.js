import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { motion } from "framer-motion";
import {
  fetchTestById,
  fetchTestResults,
} from "../../../state-management/tests/requests";
import { testsSelector } from "../../../state-management/tests/selectors";
import Loading from "../../common/Loading";
import "./CheckResults.css";
import "../takeTest/TakeTest.css";

const CheckResults = () => {
  const [questionCount, setQuestionCount] = useState(5);

  const { testId } = useParams();

  const {
    user: { id },
  } = useSelector(authSelector);
  const { testResults, currentTest, loading } = useSelector(testsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTestById({ id: testId }));
    dispatch(fetchTestResults({ userId: id, testId }));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="Check-Results-Container">
      <h2>{currentTest?.name}</h2>
      {currentTest?.questions &&
        testResults?.questionMarks &&
        currentTest?.questions
          .slice(questionCount - 5, questionCount)
          .map(({ id: qid, name, answers }) => {
            return (
              <motion.div
                initial={{ x: "100vw" }}
                animate={{
                  x: 0,
                  transition: { ease: "easeInOut", duration: 0.5 },
                }}
                key={qid}
                className="Question-Container"
              >
                <h3>
                  Question{" "}
                  {currentTest?.questions?.findIndex((q) => q.id === qid) + 1}
                </h3>
                <span className="question-text">
                  Mark for question: {testResults?.questionMarks[qid]}
                </span>
                <span className="question-text">{name}</span>
                <div className="Answers-Container">
                  {answers.map(({ id: aid, name, isCorrect }) => {
                    return (
                      <div key={aid} className="Answer">
                        <input
                          className="answer-input"
                          type="checkbox"
                          disabled="disabled"
                          id={aid}
                          defaultChecked={
                            testResults?.questions?.[qid]?.[aid] !== undefined
                          }
                          style={{
                            borderRadius: 10,
                            borderWidth: "2px",
                            backgroundColor: isCorrect ? "green" : "red",
                          }}
                        />
                        <label htmlFor={aid} className="answer-text">
                          {name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
      <Pagination
        count={Math.ceil(currentTest?.questions?.length / 5) || 1}
        sx={{ marginTop: 3 }}
        variant="outlined"
        color="primary"
        size="large"
        onChange={(e, value) => {
          setQuestionCount(value * 5);
        }}
      />
    </div>
  );
};

export default CheckResults;
