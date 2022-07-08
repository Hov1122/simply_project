import React, { useEffect, useRef, useState } from "react";
import "./CreateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Form, Formik, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRoles } from "../../../state-management/role/requests";
import { rolesSelector } from "../../../state-management/role/selectors";
import { CircularProgress } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
import Loading from "../../common/Loading";
import { TextField, Grid } from "@material-ui/core";
import * as Yup from "yup";
import ErrorOrSuccess from "../../common/ErrorOrSuccess";

function CreateUser() {
  const { roles, loading: rolesLoading } = useSelector(rolesSelector);
  const [showMessage, setShowMessage] = useState(false)
  const arrayPushRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  if (rolesLoading) return <Loading />;

  const dispatch = useDispatch();

  const addUserSchema = Yup.object().shape({
    usersData: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .min(2, "Too Short")
          .max(50, "Too Long")
          .required("*"),
        lastName: Yup.string()
          .min(2, "Too Short")
          .max(50, "Too Long")
          .required("*"),
        email: Yup.string().email("Invalid email").required("*"),
        password: Yup.string().required("*"),
      })
    ),
  });

  const rowJSX = (
    userCount,
    remove,
    errors,
    touched,
    handleBlur,
    handleChange
  ) => {
    return (
      <Grid item xs={2} sm={4} md={12} key={userCount}>
        <span>{userCount + 1}</span>
        <TextField
          type="text"
          name={`usersData[${userCount}].firstName`}
          placeholder="First Name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors?.usersData?.[userCount]?.firstName &&
            touched?.usersData?.[userCount]?.firstName
          }
          helperText={errors?.usersData?.[userCount]?.firstName}
          style={{
            // padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
            outline: "none",
          }}
        />

        <TextField
          type="text"
          name={`usersData[${userCount}].lastName`}
          placeholder="Last Name"
          onBlur={handleBlur}
          error={
            Boolean(errors?.usersData?.[userCount]?.lastName) &&
            touched?.usersData?.[userCount]?.lastName
          }
          helperText={errors?.usersData?.[userCount]?.lastName}
          onChange={handleChange}
          style={{
            // padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
            outline: "none",
          }}
        />

        <TextField
          type="text"
          name={`usersData[${userCount}].email`}
          placeholder="E-Mail"
          onBlur={handleBlur}
          error={
            errors?.usersData?.[userCount]?.email &&
            touched?.usersData?.[userCount]?.email
          }
          helperText={errors?.usersData?.[userCount]?.email}
          onChange={handleChange}
          style={{
            // padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
            outline: "none",
          }}
        />
        <TextField
          type="password"
          name={`usersData[${userCount}].password`}
          placeholder="Password"
          onBlur={handleBlur}
          error={
            errors?.usersData?.[userCount]?.password &&
            touched?.usersData?.[userCount]?.password
          }
          helperText={errors?.usersData?.[userCount]?.password}
          onChange={handleChange}
          style={{
            // padding: "5px",
            borderRadius: "3px",
            marginRight: "25px",
            outline: "none",
          }}
        />
        <TextField
          name={`usersData[${userCount}].roleId`}
          select
          value={roles[0]?.id || ""}
          style={{
            padding: "10px",
            borderRadius: "3px",
            marginRight: "25px",
            outline: "none",
          }}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </TextField>
        <IconButton
          onClick={() => remove(userCount)}
          disabled={userCount === 0}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Grid>
    );
  };

  // ADD USER
  const addUser = ({ usersData }, setSubmitting) => {
    usersData.forEach((user) => (user.roleId = +user.roleId));
    dispatch(createUserRequest(usersData, setSubmitting));
    setShowMessage(true)
  };

  return (
    <div className="UserCreater-Container">
      <h2 style={{ margin: "15px 0" }}>Create User</h2>
      {showMessage && <ErrorOrSuccess successMessage="Users created successfully"/>}

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
        {({ isSubmitting, errors, handleBlur, touched, handleChange }) => (
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
                return (
                  <Grid
                    container
                    wrap="nowrap"
                    sx={{ overflow: "auto" }}
                    spacing={2}
                    direction="column"
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {usersData?.map((user, i) =>
                      rowJSX(
                        i,
                        remove,
                        errors,
                        touched,
                        handleBlur,
                        handleChange
                      )
                    )}
                  </Grid>
                );
              }}
            </FieldArray>

            <button
              type={`button`}
              className="add-new-row-button"
              onClick={() =>  arrayPushRef.current({
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
