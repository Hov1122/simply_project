import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import Loading from "../../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Field, Form, Formik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
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
      <div key={userCount} style={{ marginBottom: "20px" }}>
        <span>{userCount}</span>
        <Field
          type="text"
          name={`data[${userCount}].firstName`}
          placeholder="First Name"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          type="text"
          name={`data[${userCount}].lastName`}
          placeholder="Last Name"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          type="text"
          name={`data[${userCount}].email`}
          placeholder="E-Mail"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          type="password"
          name={`data[${userCount}].password`}
          placeholder="Password"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          as="select"
          name={`data[${userCount}].roleId`}
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Field>
        <div
          id={userCount}
          onClick={deleteRow}
          style={{ cursor: "pointer", display: "inline-block" }}
        >
          <DeleteIcon onClick={() => deleteRow(userCount)}></DeleteIcon>
        </div>
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

  const deleteRow = (id) => {
    setUsers((users) => users.filter((user) => user.key != id));
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
              roleId: "",
            },
          ],
        }}
        onSubmit={(values) => addUser(values)}
      >
        <Form>
          {!!users.length && (
            <button type="submit" className="submit-create">
              Submit
            </button>
          )}
          {users.map((item) => item)}
          <button
            type={`button`}
            className="add-new-row-button"
            onClick={addUserRow}
          >
            Add new Row
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateUser;
