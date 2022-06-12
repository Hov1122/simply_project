import React, { useState } from "react";
import "./CreateTest.css";
import Loading from "../common/Loading";

function TestCreater() {
  const [loading] = useState(false);

  // ADD NEW ANSWER ROW
  const addAnswerRow = (e) => {
    const container = e.target.parentElement.querySelector(".AnswersForm");
    const element = container.querySelector(".Answer");
    const answerNumber = container.querySelectorAll(".Answer").length + 1;

    const newElement = element.cloneNode(true);
    const radioButton = newElement.querySelector("input[type=radio]");
    radioButton.value = answerNumber;
    const answerInput = newElement.querySelector("input[type=text]");
    console.log(answerInput);
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
    newElement.querySelector("h3").innerText += questionNumber;
    newElement.classList.add("Question");
    newElement
      .querySelector("input[type=button]")
      .addEventListener("click", addAnswerRow);
    newElement.querySelector("input[type=radio]").name = `Question${
      questionNumber - 1
    }`;
    newElement.querySelector("input[type=radio]").value = 1;

    container.append(newElement);
  };

  // ADD TEST IN DATABASE
  const addTest = () => {
    const testName = document.querySelector('[data-value="testName"]').value;
    const testSubject = document.querySelector(
      '[data-value="testSubject"]'
    ).value;
    const testDate = document.querySelector('[data-value="testDate"]').value;
    const testGroup = document.querySelector('[data-value="testGroup"]').value;
    const testQuestions = document.querySelectorAll('[data-value="questions"]');
    const testAnswers = document.querySelectorAll('[data-value="answer"]');
    const testRigthAnswers = document.querySelectorAll(
      '[data-value="rigthAnswer"]'
    );

    const questions = [];
    const answers = [];
    const rigthAnswers = [];

    testAnswers.forEach((element) => {
      const questionNumber =
        +element.parentElement.childNodes[0].name.split("Question")[1];
      if (isNaN(questionNumber)) return;
      else if (typeof answers[questionNumber] !== "object")
        answers[questionNumber] = [];
      answers[questionNumber].push(element.value);
    });

    testQuestions.forEach((element, index) => {
      if (index) questions.push(element.value);
    });

    testRigthAnswers.forEach((element) => {
      if (element.checked) rigthAnswers.push(+element.value - 1);
    });

    const data = {
      name: testName,
      subject: testSubject,
      date: testDate,
      group: testGroup,
      questions: questions,
      answers: answers,
      rigthanswers: rigthAnswers,
    };

    console.log(data); // back request
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="TestCreater-Container">
      <h2>Create Test</h2>
      <div className="testInformationHeader">
        <input placeholder="Test Name" type="text" data-value="testName" />
        <input value="Add test" type="button" onClick={addTest} />
      </div>
      <div className="testInformationData">
        <input
          placeholder="Test Subject"
          type="text"
          data-value="testSubject"
        />
        <input
          placeholder="Test Start Date"
          type="datetime-local"
          data-value="testDate"
        />
        <input placeholder="Group" type="text" data-value="testGroup" />
      </div>
      <div className="QuestionsForm">
        <template>
          <div>
            <h3>Question</h3>
            <input placeholder="Enter Question" type="text" />
            <div className="AnswersForm">
              <div className="Answer">
                <input
                  type="radio"
                  name="Question1Answer"
                  data-value="rigthAnswer"
                />
                <input
                  placeholder="Enter Answer"
                  type="text"
                  data-value="answer"
                />
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
      <input value="Add New Question" type="button" onClick={addQuestionRow} />
    </div>
  );
}

export default TestCreater;
