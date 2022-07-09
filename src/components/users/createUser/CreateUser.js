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
import * as Yup from "yup";
import ErrorOrSuccess from "../../common/ErrorOrSuccess";

function CreateUser() {
  const { roles, loading: rolesLoading } = useSelector(rolesSelector);
  const [showMessage, setShowMessage] = useState(false);
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
    userNumber,
    remove,
    errors,
    touched,
    handleBlur,
    handleChange,
    usersCount
  ) => {
    return ( 
      <div className="create-user-panel-table-row" key={userNumber}>
        <div className="create-user-table-cell" data-title="Name">
          {userNumber + 1}
        </div>
        <div className="create-user-table-cell" data-title="Name">
          <input 
            type="text" 
            placeholder="First name" 
            name={`usersData[${userNumber}].firstName`}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors?.usersData?.[userNumber]?.firstName &&
              touched?.usersData?.[userNumber]?.firstName
            }
            helperText={errors?.usersData?.[userNumber]?.firstName}
          />
        </div>
        <div className="create-user-table-cell" data-title="Age">
          <input 
            type="text" 
            placeholder="Last name" 
            name={`usersData[${userNumber}].lastName`}
            onBlur={handleBlur}
            error={
              Boolean(errors?.usersData?.[userNumber]?.lastName) &&
              touched?.usersData?.[userNumber]?.lastName
            }
            helperText={errors?.usersData?.[userNumber]?.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="create-user-table-cell" data-title="Occupation">
          <input 
            type="email" 
            placeholder="E-mail" 
            name={`usersData[${userNumber}].email`}
            onBlur={handleBlur}
            error={
              errors?.usersData?.[userNumber]?.email &&
              touched?.usersData?.[userNumber]?.email
            }
            helperText={errors?.usersData?.[userNumber]?.email}
            onChange={handleChange}
          />
        </div>
        <div className="create-user-table-cell" data-title="Occupation">
          <input 
            type="password" 
            placeholder="Password" 
            name={`usersData[${userNumber}].password`}
            onBlur={handleBlur}
            error={
              errors?.usersData?.[userNumber]?.password &&
              touched?.usersData?.[userNumber]?.password
            }
            helperText={errors?.usersData?.[userNumber]?.password}
            onChange={handleChange}
          />
        </div>
        <div className="create-user-table-cell" data-title="Occupation">
          <select
            name={`usersData[${userNumber}].roleId`}
            value={roles[0]?.id || ""}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="create-user-table-cell" data-title="Occupation">
          <IconButton
            onClick={() => remove(userNumber)}
            disabled={usersCount === 1}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      </div>
    );
  };

  // ADD USER
  const addUser = ({ usersData }, setSubmitting) => {
    usersData.forEach((user) => (user.roleId = +user.roleId));
    dispatch(createUserRequest(usersData, setSubmitting));
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  return (
    <>
      <div className="create-user-panel-component">
        <h2 style={{ margin: "15px 0" }}>Create User</h2>
        {showMessage && (
          <ErrorOrSuccess successMessage="Users created successfully" />
        )}



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
            onSubmit={(values, { setSubmitting }) =>
              addUser(values, setSubmitting)
            }
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
                      <div className="create-user-panel-table">
                      <div className="create-user-panel-table-row create-user-panel-header">
                        <div className="create-user-table-cell">No.</div>
                        <div className="create-user-table-cell">First name</div>
                        <div className="create-user-table-cell">Last name</div>
                        <div className="create-user-table-cell">Email</div>
                        <div className="create-user-table-cell">Password</div>
                        <div className="create-user-table-cell">Role</div>
                        <div className="create-user-table-cell"></div>
                      </div>
                      {usersData?.map((user, i) =>
                        rowJSX(
                          i,
                          remove,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          usersData.length
                        )
                      )}
                    </div>
                  );
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
    </>
  );
}

export default CreateUser;
