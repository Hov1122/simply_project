import React, { useEffect, useRef, useState } from "react";
import "./CreateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRoles } from "../../../state-management/role/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { rolesSelector } from "../../../state-management/role/selectors";
import { CircularProgress } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material";
import * as Yup from "yup";

function CreateUser() {
  const [success, setSuccess] = useState(false);

  const { roles } = useSelector(rolesSelector);
  const { error, loading } = useSelector(usersSelector);
  const arrayPushRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const dispatch = useDispatch();

  const addUserSchema = Yup.object().shape({
    usersData: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .min(2, <span className="field-error-message">Too Short</span>)
          .max(50, <span className="field-error-message">Too Long</span>)
          .required(<span className="field-error-message">*</span>),
        lastName: Yup.string()
          .min(2, <span className="field-error-message">Too Short</span>)
          .max(50, <span className="field-error-message">Too Long</span>)
          .required(<span className="field-error-message">*</span>),
        email: Yup.string().email("Invalid email").required("*"),
        password: Yup.string().required(
          <span className="field-error-message">*</span>
        ),
      })
    ),
  });

  const rowJSX = (userCount, remove) => {
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

        <ErrorMessage name={`usersData[${userCount}].firstName`} />

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

        <ErrorMessage name={`usersData[${userCount}].lastName`} />

        <Field
          type="email"
          name={`usersData[${userCount}].email`}
          placeholder="E-Mail"
          style={{
            padding: "5px",
            border: "none",
            borderBottom: "1px solid black",
            borderRadius: "3px",
            outline: "none",
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

        <ErrorMessage name={`usersData[${userCount}].password`} />

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
        <IconButton
          onClick={() => remove(userCount)}
          disabled={userCount === 0}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </div>
    );
  };

  // ADD USER
  const addUser = ({ usersData }, setSubmitting) => {
    usersData.forEach((user) => (user.roleId = +user.roleId));
    dispatch(createUserRequest(usersData, setSubmitting));

    setTimeout(() => {
      if (!error && !loading) {
        setSuccess("Users Created Successfully");
      } else {
        setSuccess("");
      }
    }, 2000);
  };

  return (
    <div className="UserCreater-Container">
      <h2 style={{ margin: "15px 0" }}>Create User</h2>
      {error && !loading && !success && <Alert severity="error">{error}</Alert>}
      {!loading && success && <Alert severity="success">{success}</Alert>}
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
