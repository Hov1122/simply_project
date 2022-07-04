import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import Loading from "../../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Field, Form, Formik } from "formik";
import { fetchRoles } from "../../../state-management/role/requests";
import { rolesSelector } from "../../../state-management/role/selectors";

function CreateUser() {
  const [loading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const { roles } = useSelector(rolesSelector);
  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  const dispatch = useDispatch();
  const rowJSX = (userCount) => {
    return (
      <div key={userCount}>
        <span>{userCount + 1}</span>
        <Field
          type="text"
          name={`data[${userCount}].firstName`}
          placeholder="First Name"
        />
        <Field
          type="text"
          name={`data[${userCount}].lastName`}
          placeholder="Last Name"
        />
        <Field
          type="text"
          name={`data[${userCount}].email`}
          placeholder="E-Mail"
        />
        <Field
          type="password"
          name={`data[${userCount}].password`}
          placeholder="Password"
        />
        <Field as="select" name={`data[${userCount}].roleId`}>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Field>
        <input
          type={`button`}
          onClick={(e) => deleteRow(e)}
          id={userCount}
          value="X"
        />
      </div>
    );
  };

  // ADD NEW USER ROW
  const addUserRow = () => {
    setUserCount((prevValue) => prevValue + 1);
    setUsers([...users, rowJSX(userCount)]);
  };

  // ADD USER IN DATABASE
  const addUser = ({ data }) => {
    data.forEach((user) => (user.roleId = +user.roleId));
    dispatch(createUserRequest(data));
  };

  const deleteRow = (e) => {
    setUsers((users) => users.filter((user) => user.key != e.target.id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="UserCreater-Container">
      <h2>Create User</h2>
      <Formik
        initialValues={{
          data: [
            {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              roleId: roles[0]?.id,
            },
          ],
        }}
        onSubmit={(values) => addUser(values)}
      >
        <Form>
          <button type="submit">Submit</button>
          {users.map((item) => item)}
          <button type={`button`} onClick={addUserRow}>
            Add new Row
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateUser;
