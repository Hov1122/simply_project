import React, { useState } from "react";
import "./CreateTest.css";
import Loading from "../common/Loading";

function TestCreater() {
  const [loading, setLoading] = useState(false);

  const addAnswerRow = (e) => {
    const container = e.target.parentElement.querySelector('.AnswersForm');
    const element = container.querySelector('.Answer')

    const newElement = element.cloneNode(true)
    newElement.querySelector("input[type=radio]")
    container.append(newElement)
  }

  const addQuestionRow = (e) => {
    const container = e.target.parentElement.querySelector('.QuestionsForm');
    const element = document.querySelector('template').childNodes[0];
    const questionNumber = document.querySelectorAll('.Question').length + 1

    const newElement = element.cloneNode(true);
    newElement.querySelector("h3").innerText += questionNumber;
    newElement.classList.add('Question');
    newElement.setAttribute('data-value', questionNumber)
    newElement.querySelector('input[type=button]').addEventListener('click', addAnswerRow)
    newElement.querySelector('input[type=radio]').name = `Question${questionNumber}Answer`

    container.append(newElement);
  }

  const addTest = (e) => {
    console.log(e.target)
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="TestCreater-Container">
      <h2>Create Test</h2>
      <div className="testInformationHeader">
        <input placeholder="Test Name" type='text' data-value='testName'/>
        <input value="Add test" type='button' onClick={addTest}/>
      </div>
      <div className="testInformationData">
        <input placeholder="Test Subject" type='text' data-value='testSubject'/>
        <input placeholder="Test Start Date" type='datetime-local' data-value='testDate'/>
        <input placeholder="Group" type='text' data-value='testGroup'/>
      </div>
      <div className="QuestionsForm">
        <template>
          <div data-value='0'>
            <h3>Question</h3>
            <input placeholder="Enter Question" type='text' data-value='question'/>
            <div className="AnswersForm">
              <div className="Answer">
                <input type='radio' name="Question1Answer"/>
                <input placeholder="Enter Answer" type='text' data-value='answer'/>
              </div>
            </div>
            <input value="Add New Answer" type='button' onClick={addAnswerRow}/>
          </div>
        </template>
      </div>
      <input value="Add New Question" type='button' onClick={addQuestionRow}/>
    </div>
  );
}

export default TestCreater;
