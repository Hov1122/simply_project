import React, { useEffect, useRef } from "react";
import "./CreateUser.css";
import Loading from "../../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRoles } from "../../../state-management/role/requests";
import { rolesSelector } from "../../../state-management/role/selectors";
import { CircularProgress } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";

import * as Yup from "yup";

function CreateUser() {
  const { roles, loading } = useSelector(rolesSelector);
  const arrayPushRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const dispatch = useDispatch();

  if (loading) {
    return <Loading />;
  }

  const addUserSchema = Yup.object().shape({
    usersData: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        lastName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
      })
    ),
  });

  const rowJSX = (userCount, remove) => {
    console.log(userCount);
    return (
      <div key={userCount} style={{ marginBottom: "20px" }}>
        <span>{userCount + 1}</span>
        <Field
          type="text"
          name={`usersData[${userCount}].firstName`}
          placeholder="First Name"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <ErrorMessage name={`users.${userCount}.firstName`} />
        <Field
          type="text"
          name={`usersData[${userCount}].lastName`}
          placeholder="Last Name"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          type="text"
          name={`usersData[${userCount}].email`}
          placeholder="E-Mail"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          type="password"
          name={`usersData[${userCount}].password`}
          placeholder="Password"
          style={{
            padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
          }}
        />
        <Field
          as="select"
          name={`usersData[${userCount}].roleId`}
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
        <IconButton>
          <DeleteIcon onClick={() => remove(userCount)}></DeleteIcon>
        </IconButton>
      </div>
    );
  };

  // ADD USER IN DATABASE
  const addUser = ({ usersData }, setSubmitting) => {
    usersData.forEach((user) => (user.roleId = +user.roleId));
    dispatch(createUserRequest(usersData, setSubmitting));
  };

  return (
    <div className="UserCreater-Container">
      <h2>Create User</h2>
      <Formik
        initialValues={{
          usersData: [
            {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              roleId: roles[0]?.id,
            },
          ],
        }}
        validationSchema={addUserSchema}
        onSubmit={(values, { setSubmitting }) => addUser(values, setSubmitting)}
      >
        {({ isSubmitting }) => (
          <Form autoCapitalize="off">
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className="submit-create"
              startIcon={isSubmitting ? <CircularProgress /> : undefined}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              {console.log(isSubmitting)}
            </Button>
            <FieldArray name="usersData">
              {({
                push,
                remove,
                form: {
                  values: { usersData },
                },
              }) => {
                arrayPushRef.current = push;
                return usersData?.map((user, i) => rowJSX(i, remove));
              }}
            </FieldArray>

            <button
              type={`button`}
              className="add-new-row-button"
              onClick={() =>
                arrayPushRef.current({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  roleId: roles[0]?.id,
                })
              }
            >
              Add new Row
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateUser;
