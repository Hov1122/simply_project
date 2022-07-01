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
import Select from "react-select";

function TestCreater() {
  const [loading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState(null);

  const { subjects } = useSelector(subjectsSelector);
  const { user: userGroup } = useSelector(authSelector);
  const dispatch = useDispatch();

  const subjectSelect = subjects.slice(1).map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });
  const groupSelect = userGroup?.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  // ADD NEW ANSWER ROW
  const addAnswerRow = (e) => {
    const container = e.target.parentElement.querySelector(".AnswersForm");
    const element = container.querySelector(".Answer");
    const answerNumber = container.querySelectorAll(".Answer").length + 1;

    const newElement = element.cloneNode(true);
    const radioButton = newElement.querySelector("input[type=checkbox]");
    radioButton.value = answerNumber;
    const answerInput = newElement.querySelector("input[type=text]");

    newElement
      .querySelector("[data-value=deleteAnswer]")
      .addEventListener("click", () => {
        newElement.remove();
      });

    answerInput.setAttribute("data-value", "answer");
    container.appendChild(newElement);
  };

  // ADD NEW QUESTION
  const addQuestionRow = (e) => {
    const container = e.target.parentElement.querySelector(".QuestionsForm");
    const element = document.querySelector("template").childNodes[0];
    element.childNodes[1].setAttribute("data-value", "questions");
    const questionNumber = document.querySelectorAll(".Question").length + 1;

    const newElement = element.cloneNode(true);
    newElement.querySelector("h3").innerText += ` ${questionNumber}`;
    newElement.classList.add("Question");
    newElement
      .querySelector("input[type=button]")
      .addEventListener("click", addAnswerRow);
    newElement.querySelector("input[type=checkbox]").name = `Question${
      questionNumber - 1
    }`;
    newElement.querySelector("input[type=checkbox]").value = 1;
    newElement
      .querySelector("[data-value=deleteQuestion]")
      .addEventListener("click", () => {
        newElement.remove();
        const headers = document.querySelectorAll("h3");
        headers.forEach((element, index) => {
          element.innerText = `Question ${index}`;
        });
      });
    newElement
      .querySelector("[data-value=deleteAnswer]")
      .addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });

    container.append(newElement);
  };

  // ADD TEST IN DATABASE
  const addTest = () => {
    const testName = document.querySelector('[data-value="testName"]').value;
    const testDate = document.querySelector('[data-value="testDate"]').value;
    const testQuestions = document.querySelectorAll('[data-value="questions"]');
    const testAnswers = document.querySelectorAll('[data-value="answer"]');
    const testLength = +document.querySelector('[data-value="testLength"]')
      .value;
    const testRating = +document.querySelector('[data-value="testRating"]')
      .value;

    const questions = [];
    const answers = [];

    testAnswers.forEach((element) => {
      const questionNumber =
        +element.parentElement.childNodes[0].name.split("Question")[1];
      if (isNaN(questionNumber)) return;
      else if (typeof answers[questionNumber] !== "object")
        answers[questionNumber] = [];
      answers[questionNumber].push({
        name: element.value,
        isCorrect: element.parentElement.childNodes[0].checked,
      });
    });

    testQuestions.forEach((element, index) => {
      if (index) questions.push({ name: element.value });
    });

    const data = {
      userId: 1, // userId
      name: testName,
      subjectId: selectedSubject,
      highestScore: testRating,
      start: new Date(testDate).toISOString(),
      length: testLength,
      group: selectedGroups,
      questions: questions,
      answers: answers,
    };
    dispatch(createTestRequest(data));
  };

  if (loading) {
    return <Loading />;
  }

  const handleSelectSubject = (e) => {
    setSelectedSubject(e.value);
  };

  const handleSelectGroups = (e) => {
    setSelectedGroups(e.value);
  };

  return (
    <div className="TestCreater-Container">
      <h2>Create Test</h2>
      <div className="testInformationHeader">
        <input placeholder="Test Name" type="text" data-value="testName" />
        <input value="Add test" type="button" onClick={addTest} />
      </div>
      <div className="testInformationData">
        <Select
          options={subjectSelect}
          placeholder="Subject"
          onChange={handleSelectSubject}
        />
        <Select
          options={groupSelect}
          placeholder="Group"
          onChange={handleSelectGroups}
        />
      </div>
      <div className="testInformationData">
        <input
          placeholder="Test Start Date"
          type="datetime-local"
          data-value="testDate"
        />
        <input
          placeholder="Test length"
          type="number"
          data-value="testLength"
        />
        <input placeholder="Rating" type="number" data-value="testRating" />
      </div>
      <div className="QuestionsForm">
        <template>
          <div className="Question-Container">
            <h3>Question</h3>
            <input placeholder="Enter Question" type="text" />
            <button className="delete-question" data-value="deleteQuestion">
              x
            </button>
            <div className="AnswersForm">
              <div className="Answer">
                <input
                  type="checkbox"
                  name="Question1Answer"
                  data-value="rigthAnswer"
                />
                <input
                  placeholder="Enter Answer"
                  type="text"
                  data-value="answer"
                />
                <button className="delete-answer" data-value="deleteAnswer">
                  x
                </button>
              </div>
            </div>
            <input
              value="Add New Answer"
              type="button"
              onClick={addAnswerRow}
            />
          </div>
        </template>
      </div>
      <input
        id="addNewQuestion"
        value="Add New Question"
        type="button"
        onClick={addQuestionRow}
      />
    </div>
  );
}

export default TestCreater;
