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
import * as Yup from "yup";

function TestCreater() {
  const [loading] = useState(false);
  const arrayPushRef = useRef(null);
  const answerPushRefs = useRef([]);

  const createTestSchema = Yup.object().shape({
    userId: Yup.number().strict().required(),
    name: Yup.string().min(3).required(),
    subjectId: Yup.number().required(),
    start: Yup.string().required(),
    length: Yup.number().strict().required(),
    highestScore: Yup.number().strict().required(),
    group: Yup.number().required(),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, <span className="field-error-message">Too Short</span>)
          .max(50, <span className="field-error-message">Too Long</span>)
          .required(<span className="field-error-message">*</span>),
        answers: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required(
              <span className="field-error-message">*</span>
            ),
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

  const QuestionJSX = (question, questionNumber, remove) => {
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
          <button
            className="delete-answer"
            type={`button`}
            onClick={() => remove(questionNumber)}
          >
            X
          </button>
        </div>

        <FieldArray name={`questions.${questionNumber}.answers`}>
          {({ push, remove, errors }) => {
            answerPushRefs[questionNumber] = push;
            return answers?.map((user, i) =>
              AnswerJSX(i, questionNumber, remove, errors)
            );
          }}
        </FieldArray>
        <button
          className="CreateTest-buttons"
          type="button"
          onClick={() => {
            answerPushRefs[questionNumber]({ isCorrect: false, name: "" });
          }}
        >
          Add answer
        </button>
      </div>
    );
  };

  const AnswerJSX = (answerNumber, questionNumber, remove) => {
    return (
      <div
        key={`${questionNumber} ${answerNumber}`}
        className={"TestCreater-Answer-Container"}
      >
        <Field
          type="checkbox"
          name={`questions[${questionNumber}].answers[${answerNumber}].isCorrect`}
        />
        <Field
          type="text"
          placeholder="Enter Answer"
          name={`questions[${questionNumber}].answers[${answerNumber}].name`}
        />
        <button
          className="delete-answer"
          type="button"
          onClick={() => {
            remove(answerNumber);
          }}
        >
          X
        </button>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  // ADD TEST IN DATABASE
  const addTest = (data) => {
    data.start += ":00.000Z";
    const questions = [];
    const answers = [];
    data.questions.forEach((q) => {
      questions.push({ name: q.name });
      answers.push(q.answers);
    });
    data.questions = questions;
    data.answers = answers;
    console.log(data);
    dispatch(createTestRequest(data));
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
          subjectId: 1,
          highestScore: "",
          start: "",
          length: "",
          group: 1,
          questions: [{ name: "", answers: [{ isCorrect: false, name: "" }] }],
        }}
        validationSchema={createTestSchema}
        onSubmit={(values) => addTest({ ...values })}
      >
        <Form>
          <div>Questions count: </div>
          <div className="testInformationHeader">
            <Field type="text" placeholder="Test Name" name="name" />
            <input
              value="Add test"
              type="submit"
              className="CreateTest-buttons"
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
                console.log(element);
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
            <Field placeholder="Test length" type="number" name="length" />
            <Field
              placeholder="Test rating"
              type="number"
              name="highestScore"
            />
          </div>
          <div className="QuestionsForm">
            <FieldArray name="questions">
              {({ push, remove, errors, form: { values } }) => {
                const { questions } = values;
                arrayPushRef.current = push;
                return questions?.map((q, i) =>
                  QuestionJSX(q, i, remove, errors)
                );
              }}
            </FieldArray>
            <button
              className="CreateTest-buttons"
              type="button"
              onClick={() =>
                arrayPushRef.current({
                  name: "",
                  answers: [{ isCorrect: false, name: "" }],
                })
              }
            >
              Add New Question
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default TestCreater;
