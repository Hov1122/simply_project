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
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useRef } from "react";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { Alert } from "@mui/material";
import { testsSelector } from "../../../state-management/tests/selectors";

function TestCreater() {
  const [loading] = useState(false);
  const [showMessage, setShowMessage] = useState(false)
  const [success, setSuccess] = useState('')
  const arrayPushRef = useRef(null);
  const answerPushRefs = useRef([]);
  const { loading: groupsLoading } = useSelector(groupsSelector);
  const { loading: subjectsLoading } = useSelector(subjectsSelector);
  const {error} = useSelector(testsSelector)

  const createTestSchema = Yup.object().shape({
    userId: Yup.number().strict().required(),
    name: Yup.string()
      .min(2, <span className="field-error-message">Too Short</span>)
      .max(50, <span className="field-error-message">Too Long</span>)
      .required(<span className="field-error-message">*</span>),
    subjectId: Yup.number().required(),
    start: Yup.string().required(
      <span className="field-error-message">*</span>
    ),
    length: Yup.number()
      .strict()
      .min(2, <span className="field-error-message">Too Short</span>)
      .max(300, <span className="field-error-message">Too Long</span>)
      .required(<span className="field-error-message">*</span>),
    highestScore: Yup.number()
      .strict()
      .min(1, <span className="field-error-message">Too Short</span>)
      .required(<span className="field-error-message">*</span>),
    group: Yup.number().required(),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(4, <span className="field-error-message">Too Short</span>)
          .max(50, <span className="field-error-message">Too Long</span>)
          .required(<span className="field-error-message">*</span>),
        answers: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required(<span className="field-error-message">*</span>)
              .min(2, <span className="field-error-message">Too Short</span>)
              .max(50, <span className="field-error-message">Too Long</span>),
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

  const QuestionJSX = (question, questionNumber, remove, questionsCount) => {
    const { answers } = question;
    return (
      <div key={questionNumber}>
        <h3>Question {+questionNumber + 1}</h3>
        <div className="Question-header">
          <Field
            placeholder="Enter Question"
            type="text"
            name={`questions[${questionNumber}].name`}
          />
          <IconButton
            onClick={() => remove(questionNumber)}
            disabled={questionsCount === 1}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>

        <ErrorMessage name={`questions[${questionNumber}].name`} />

        <FieldArray name={`questions.${questionNumber}.answers`}>
          {({ push, remove }) => {
            answerPushRefs[questionNumber] = push;
            return answers?.map((user, i) =>
              AnswerJSX(i, questionNumber, remove, answers.length)
            );
          }}
        </FieldArray>
        <button
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

  const AnswerJSX = (answerNumber, questionNumber, remove, answersCount) => {
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
        <Field
          type="text"
          placeholder="Enter Answer"
          name={`questions[${questionNumber}].answers[${answerNumber}].name`}
        />
        <ErrorMessage
          name={`questions[${questionNumber}].answers[${answerNumber}].name`}
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
          userId: id, // userId
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
          setShowMessage(true)
          setTimeout(() => setSuccess(error), 1000)
          return addTest({ ...values }, setSubmitting)
        }}
      >
        {({ isSubmitting }) => (
          <Form autoCapitalize="off">
          {showMessage && success && <Alert severity="error" sx={{margin: "15px auto"}}>Test created successfully.</Alert>}
          {showMessage && error && <Alert severity="error" sx={{margin: "15px auto"}}>{error}</Alert>}
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className="submit-create"
              startIcon={isSubmitting ? <CircularProgress /> : undefined}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <div className="testInformationHeader">
              <Field type="text" placeholder="Test Name" name="name" />
              <ErrorMessage name={`name`} />
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
              <Field
                placeholder="Test Start Date"
                type="datetime-local"
                name="start"
              />
              <ErrorMessage name={`start`} />
              <Field placeholder="Test length" type="number" name="length" />
              <ErrorMessage name={`length`} />
              <Field
                placeholder="Test rating"
                type="number"
                name="highestScore"
              />
              <ErrorMessage name={`highestScore`} />
            </div>

            <div className="QuestionsForm">
              <FieldArray name="questions">
                {({ push, remove, form: { values } }) => {
                  const { questions } = values;
                  arrayPushRef.current = push;
                  return questions?.map((q, i) =>
                    QuestionJSX(q, i, remove, questions.length)
                  );
                }}
              </FieldArray>
              <button
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
