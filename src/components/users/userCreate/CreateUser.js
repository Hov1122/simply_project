import React, { useState } from "react";
import "./CreateUser.css";
import Loading from "../../common/Loading";
// import { useDispatch } from "react-redux";

function UserCreater() {
  const [loading] = useState(false);

  // const dispatch = useDispatch();

  // ADD NEW USER ROW
  const addUserRow = () => {
    const container = document.querySelector('tbody')
    const defaultElement = document.querySelector('[data-value=firstChild]')
    const userNumber = document.querySelectorAll('[data-value=id]');
    const newElement = defaultElement.cloneNode(true);
    container.append(newElement)
    newElement.firstChild.innerText = userNumber.length + 1
    userNumber.forEach((element, index) => {
      element.innerText = index + 1
    })
  };

  // ADD USER IN DATABASE
  const addUser = () => {
    const ID = document.querySelectorAll('[data-value=id]')
    const firstName = document.querySelectorAll('[data-value=firstName]')
    const lastName = document.querySelectorAll('[data-value=lastName]')
    const e_mail = document.querySelectorAll('[data-value=eMail]')
    const password = document.querySelectorAll('[data-value=password]')
    const roleId = document.querySelectorAll('[data-value=role]')
    const groupId = document.querySelectorAll('[data-value=group]')

    const data = [];

    ID.forEach((element, index) => {
      data.push({
        firstName: firstName[index].value,
        lastName: lastName[index].value,
        email: e_mail[index].value,
        password: password[index].value,
        roleId: roleId[index].value,
        userGroup: groupId[index].value
      })
    })

    // dispatch(createTestRequest(data));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="UserCreater-Container">
      <h2>Create User</h2>
      <table className="UserCreater-Table">
        <thead>
          <tr>
            <td colSpan={6}><input type={`button`} value={`Add users`} onClick={addUser}/></td>
          </tr>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
            <tr data-value='firstChild'>
              <td data-value='id'>1</td>
              <td><input type={`text`} placeholder={"Enter FirstName"} data-value='firstName'/></td>
              <td><input type={`text`} placeholder={"Enter LastName"} data-value='lastName'/></td>
              <td><input type={`text`} placeholder={"Enter E-mail"}  data-value='eMail'/></td>
              <td><input type={`password`} placeholder={"Enter Password"} data-value='password'/></td>
              <td>
                <select data-value='role'>
                  <option value='1'>Admin</option>
                  <option value='2'>Teacher</option>
                  <option value='3'>Student</option>
                </select>
              </td>
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}><input type={`button`} value={`Add new row`} onClick={addUserRow}/></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default UserCreater;
