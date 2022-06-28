import React, {  useState } from "react";
import "./CreateUser.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";

function CreateUser() {
  const [loading] = useState(false);
  // const rowContainer = useRef(null);
  // const rowDefaultElement = useRef(null);


  const dispatch = useDispatch();

  // ADD NEW USER ROW
  const addUserRow = () => {
    const container = document.querySelector(".UserCreater-Table-Body");
    const defaultElement = document.querySelector("[data-value=firstChild]");
    const newElement = defaultElement.cloneNode(true);
    newElement
      .querySelector("[data-value=deleteButton]")
      .addEventListener("click", deleteRow);
    container.append(newElement);
    const headers = document.querySelectorAll('[data-value=id]');
      headers.forEach((element, index) => {
        element.innerText = `${index + 1}`
      })
    
  };

  // ADD USER IN DATABASE
  const addUser = () => {
    const ID = document.querySelectorAll("[data-value=id]");
    const firstName = document.querySelectorAll("[data-value=firstName]");
    const lastName = document.querySelectorAll("[data-value=lastName]");
    const e_mail = document.querySelectorAll("[data-value=eMail]");
    const password = document.querySelectorAll("[data-value=password]");
    const roleId = document.querySelectorAll("[data-value=role]");

    const data = [];

    ID.forEach((element, index) => {
      data.push({
        firstName: firstName[index].value,
        lastName: lastName[index].value,
        email: e_mail[index].value,
        password: password[index].value,
        roleId: +roleId[index].value,
      });
      firstName[index].value = "";
      lastName[index].value = "";
      e_mail[index].value = "";
      password[index].value = "";
      roleId[index].value = "";
    });

    dispatch(createUserRequest(data));
  };

  const deleteRow = (e) => {
    const target = document.querySelector(`.UserCreater-Table-Body`)
    if (target.children.length === 1) return;
    e.target.parentElement.parentElement.remove();
    const headers = document.querySelectorAll('[data-value=id]');
      headers.forEach((element, index) => {
        element.innerText = `${index + 1}`
      })
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="UserCreater-Container">
      <h2>Create User</h2>
      <div className="UserCreater-Table">
        <div className="UserCreater-Table-Header">
          <div className="UserCreater-Table-Header-AddUserButton">
            <input type={`button`} value={`Add users`} onClick={addUser} />
          </div>
        </div>
        <div className="UserCreater-Table-Body">
          <div data-value='firstChild'>
            <div>
              <span data-value="id">1</span>
            </div>
            <div>
              <input
                type={`text`}
                placeholder={"Enter FirstName"}
                data-value="firstName"
              />
            </div>
            <div>
              <input
                type={`text`}
                placeholder={"Enter LastName"}
                data-value="lastName"
              />
            </div>
            <div>
              <input
                type={`text`}
                placeholder={"Enter E-mail"}
                data-value="eMail"
              />
            </div>
            <div>
              <input
                type={`password`}
                placeholder={"Enter Password"}
                data-value="password"
              />
            </div>
            <div>
              <select data-value="role">
                <option value="1">Admin</option>
                <option value="2">Teacher</option>
                <option value="3">Student</option>
              </select>
            </div>
            <div>
              <button
                style={{ cursor: "pointer" }}
                data-value="deleteButton"
                onClick={deleteRow}
              >X</button>
            </div>
          </div>
        </div>
        <div className="UserCreater-Table-Footer">
          <input
            type={`button`}
            value={`Add new row`}
            onClick={addUserRow}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
