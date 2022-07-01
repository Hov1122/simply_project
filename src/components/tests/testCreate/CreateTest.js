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
import { Formik, Form, Field } from "formik";

function TestCreater() {
  const [loading] = useState(false);

  const { subjects } = useSelector(subjectsSelector);
  const { user: { userGroup, role: { name }, id } } = useSelector(authSelector);
  const { groups } = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const [questionNumber, setQuestionNumber] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

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
      : userGroup?.map((elem) => {
          return {
            value: elem.id,
            label: elem.name,
          };
        });

  const QuestionJSX = (questionNumber) => {
    return (
      <div>
          <div className="Question-Container">
            <h3>Question</h3>
            <div className="Question-header">
              <Field placeholder="Enter Question" type="text" name={`questions[${questionNumber}]`}/>
              <button type={`button`} onClick={deleteQuestion} >X</button>
            </div>
            <div className="AnswersForm">
              {answers?.map(item => item)}
            </div>
            <button type="button" id={questionNumber} onClick={addAnswerRow}>Add New Answer</button>
          </div>
      </div>
    )
  }

  const AnswerJSX = (questinoNumber, answerNumber) => {
    return (
      <div className="Answer">
        <Field type="checkbox" name={`answers[${questinoNumber}][${answerNumber}].isCorrect`}/>
        <Field type="text" placeholder="Enter Answer" name={`answers[${questinoNumber}][${answerNumber}].name`}/>
        <button className="delete-answer" value="X" onClick={deleteAnswer} data-value={`${questinoNumber},${answerNumber}`}/>
      </div>
    )
  }

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  // ADD NEW ANSWER ROW
  const addAnswerRow = (e) => {
    const questionNumber = e.target.id;
    setAnswers([
      ...answers,
      AnswerJSX(
        questionNumber,
        answers.length
      )
    ])
    console.log(answers)
  };

  // ADD NEW QUESTION
  const addQuestionRow = () => {
    setQuestionNumber(prevValue => prevValue + 1)
    setAnswers([])
    setQuestions([
      ...questions,
      QuestionJSX(
        questionNumber
      )
    ])
  };

  // ADD TEST IN DATABASE
  const addTest = (data) => {
    console.log(data)
    dispatch(createTestRequest(data));
  };

  const deleteQuestion = () => {

  }

  const deleteAnswer = () => {

  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="TestCreater-Container">
      <h2>Create Test</h2>
      <Formik
        initialValues={{
            userId: id, // userId
            name: '',
            subjectId: 1,
            highestScore: '',
            start: '',
            length: '', 
            group: 1,
            questions: '',
            answers: '',
        }}
        onSubmit={values => addTest({...values})}
      >
        <Form>
          <div className="testInformationHeader">
            <Field type="text" placeholder="Test Name" name="name" />
            <input value="Add test" type="submit"/>
          </div>
          <div className="testInformationData">
            <Field as='select' name="subjectId"> 
              {subjectSelect.map(element => {
                return (
                  <option key={element.label} value={element.value}>{element.label}</option>
                )
              })}
            </Field>
            <Field as='select' name="group" > 
              {groupSelect.map(element => {
                return (
                  <option key={element.label} value={element.value}>{element.label}</option>
                )
              })}
            </Field>
          </div>
          <div className="testInformationData">
            <Field placeholder="Test Start Date" type="datetime-local" name="start"/>
            <Field placeholder="Test length" type="number" name="length"/>
            <Field placeholder="Test rating" type="number" name="highestScore"/>
          </div>
          <div className="QuestionsForm">
            {questions.map(item => item)}
          </div>
          <Field type='button' value='Add new question' onClick={addQuestionRow}/>
        </Form>
      </Formik>
    </div>
  );
}

export default TestCreater;
