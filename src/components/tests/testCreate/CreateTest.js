import React, { useEffect, useState } from "react";
import "./CreateTest.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { createTestRequest } from "../../../state-management/tests/requests";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { authSelector } from "../../../state-management/auth/selectors";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { Formik, Form, Field, FieldArray } from "formik";
import { useRef } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { Alert } from "@mui/material";
import { testsSelector } from "../../../state-management/tests/selectors";

function TestCreater() {
  const [loading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState("");
  const arrayPushRef = useRef(null);
  const answerPushRefs = useRef([]);
  const { loading: groupsLoading } = useSelector(groupsSelector);
  const { loading: subjectsLoading } = useSelector(subjectsSelector);
  const { error } = useSelector(testsSelector);

  const today = new Date();

  const createTestSchema = Yup.object().shape({
    userId: Yup.number().strict().required(),
    name: Yup.string().min(2, "Too Short").max(50, "Too Long").required("*"),
    subjectId: Yup.number().required(),
    start: Yup.date()
      .required("*")
      .min(today, "Start date must be today or later"),
    length: Yup.number()
      .strict()
      .min(2, "Too Short")
      .max(300, "Too Long")
      .required("*"),
    highestScore: Yup.number().strict().min(1, "Too Little").required("*"),
    group: Yup.number().required(),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(4, "Too Short")
          .max(150, "Too Long")
          .required("*"),
        answers: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("*").max(150, "Too Long"),
            isCorrect: Yup.boolean().required(
              <span className="field-error-message">*</span>
            ),
          })
        ),
      })
    ),
  });

  const { subjects } = useSelector(subjectsSelector);
  const {
    user: {
      userGroup,
      role: { name },
      id,
    },
  } = useSelector(authSelector);
  const { groups } = useSelector(groupsSelector);
  const dispatch = useDispatch();

  const subjectSelect = subjects.slice(1).map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  const groupSelect =
    name === "Admin"
      ? groups.map(({ id, name }) => {
          return {
            value: id,
            label: name,
          };
        })
      : userGroup?.map(({ group }) => {
          return {
            value: group.id,
            label: group.name,
          };
        });

  const QuestionJSX = (
    question,
    questionNumber,
    remove,
    questionsCount,
    errors,
    touched,
    handleBlur,
    handleChange
  ) => {
    const { answers } = question;
    return (
      <div key={questionNumber}>
        <h3>Question {+questionNumber + 1}</h3>
        <div className="Question-header">
          <TextField
            placeholder="Enter Question"
            type="text"
            name={`questions[${questionNumber}].name`}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              Boolean(errors?.questions?.[questionNumber]?.name) &&
              touched?.questions?.[questionNumber]?.name
            }
            helperText={errors?.questions?.[questionNumber]?.name}
          />
          <IconButton
            onClick={() => remove(questionNumber)}
            disabled={questionsCount === 1}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>

        <FieldArray name={`questions.${questionNumber}.answers`}>
          {({ push, remove }) => {
            answerPushRefs[questionNumber] = push;
            return answers?.map((user, i) =>
              AnswerJSX(
                i,
                questionNumber,
                remove,
                answers.length,
                errors,
                touched,
                handleBlur,
                handleChange
              )
            );
          }}
        </FieldArray>
        <button
          type="button"
          className="icon-btn add-btn"
          onClick={() => {
            answerPushRefs[questionNumber]({ isCorrect: false, name: "" });
          }}
        >
          <div className="add-icon"></div>
          <div className="btn-txt">Add answer</div>
        </button>
      </div>
    );
  };

  const AnswerJSX = (
    answerNumber,
    questionNumber,
    remove,
    answersCount,
    errors,
    touched,
    handleBlur,
    handleChange
  ) => {
    return (
      <div
        key={`${questionNumber} ${answerNumber}`}
        className={"TestCreater-Answer-Container"}
      >
        <Field
          type="checkbox"
          name={`questions[${questionNumber}].answers[${answerNumber}].isCorrect`}
          className={`answer-input`}
        />
        <TextField
          type="text"
          placeholder="Enter Answer"
          name={`questions[${questionNumber}].answers[${answerNumber}].name`}
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            Boolean(
              errors?.questions?.[questionNumber]?.answers?.[answerNumber]?.name
            ) &&
            touched?.questions?.[questionNumber]?.answers?.[answerNumber]?.name
          }
          helperText={
            errors?.questions?.[questionNumber]?.answers?.[answerNumber]?.name
          }
        />

        <IconButton
          onClick={() => remove(answerNumber)}
          disabled={answersCount === 1}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  if (groupsLoading || subjectsLoading) return <Loading />;

  // ADD TEST IN DATABASE
  const addTest = (data, setSubmitting) => {
    data.start += ":00.000Z";
    const questions = [];
    const answers = [];
    data.questions.forEach((q) => {
      questions.push({ name: q.name });
      answers.push(q.answers);
    });
    data.questions = questions;
    data.answers = answers;
    dispatch(createTestRequest(data, setSubmitting));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="TestCreater-Container">
      <h2>Create Test</h2>
      <Formik
        initialValues={{
          userId: id,
          name: "",
          subjectId: subjectSelect[0]?.value,
          highestScore: "",
          start: "",
          length: "",
          group: groupSelect[0]?.value,
          questions: [{ name: "", answers: [{ isCorrect: false, name: "" }] }],
        }}
        validationSchema={createTestSchema}
        onSubmit={(values, { setSubmitting }) => {
          setShowMessage(true);
          setTimeout(() => setSuccess(error), 1000);
          return addTest({ ...values }, setSubmitting);
        }}
      >
        {({ isSubmitting, errors, handleChange, handleBlur, touched }) => (
          <Form autoCapitalize="off">
            {showMessage && success && (
              <Alert severity="error" sx={{ margin: "15px auto" }}>
                Test created successfully.
              </Alert>
            )}
            {showMessage && error && (
              <Alert severity="error" sx={{ margin: "15px auto" }}>
                {error}
              </Alert>
            )}
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className="submit-create"
              startIcon={isSubmitting ? <CircularProgress /> : undefined}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
            <div className="testInformationHeader">
              <TextField
                type="text"
                placeholder="Test Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors?.name) && touched?.name}
                helperText={errors?.name}
              />
            </div>

            <div className="testInformationData">
              <Field as="select" name="subjectId">
                {subjectSelect.map((element) => {
                  return (
                    <option key={element.label} value={element.value}>
                      {element.label}
                    </option>
                  );
                })}
              </Field>
              <Field as="select" name="group">
                {groupSelect.map((element) => {
                  return (
                    <option key={element.label} value={element.value}>
                      {element.label}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div className="testInformationData">
              <TextField
                placeholder="Test Start Date"
                type="datetime-local"
                name="start"
                min={new Date()}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors?.start) && touched?.start}
                helperText={errors?.start}
              />

              <TextField
                placeholder="Test length"
                type="number"
                name="length"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors?.length) && touched?.length}
                helperText={errors?.length}
              />

              <TextField
                placeholder="Test rating"
                type="number"
                name="highestScore"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors?.highestScore) && touched?.highestScore}
                helperText={errors?.highestScore}
              />
            </div>

            <div className="QuestionsForm">
              <FieldArray name="questions">
                {({ push, remove, form: { values } }) => {
                  const { questions } = values;
                  arrayPushRef.current = push;
                  return questions?.map((q, i) =>
                    QuestionJSX(
                      q,
                      i,
                      remove,
                      questions.length,
                      errors,
                      touched,
                      handleBlur,
                      handleChange
                    )
                  );
                }}
              </FieldArray>
              <button
                type="button"
                className="icon-btn add-btn add-question-btn"
                onClick={() =>
                  arrayPushRef.current({
                    name: "",
                    answers: [{ isCorrect: false, name: "" }],
                  })
                }
              >
                <div className="add-icon"></div>
                <div className="btn-txt">Add question</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TestCreater;
