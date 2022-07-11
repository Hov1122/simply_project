import React, { useEffect, useRef, useState } from "react";
import "./CreateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../state-management/users/requests";
import { Form, Formik, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRoles } from "../../../state-management/role/requests";
import { rolesSelector } from "../../../state-management/role/selectors";
import { CircularProgress } from "@mui/material";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import Loading from "../../common/Loading";
import * as Yup from "yup";
import ErrorOrSuccess from "../../common/ErrorOrSuccess";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { groupsSelector } from "../../../state-management/groups/selectors";

function CreateUser() {
  const [showMessage, setShowMessage] = useState(false);
  const { roles, loading: rolesLoading } = useSelector(rolesSelector);
  const { groups } = useSelector(groupsSelector);
  const arrayPushRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchGroupsRequest());
  }, []);

  if (rolesLoading) return <Loading />;

  const dispatch = useDispatch();

  const addUserSchema = Yup.object().shape({
    usersData: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .min(3, "Too Short")
          .max(50, "Too Long")
          .required("*"),
        lastName: Yup.string()
          .min(3, "Too Short")
          .max(50, "Too Long")
          .required("*"),
        email: Yup.string().email("Invalid email").required("*"),
        password: Yup.string().required("*"),
      })
    ),
  });

  const groupFormik = groups.map((group) => {
    return { name: group.name, checked: false, id: group.id };
  });

  const rowJSX = (
    userNumber,
    remove,
    errors,
    touched,
    handleBlur,
    handleChange,
    usersCount,
    values
  ) => {
    const selectedGroups = values.usersData[userNumber].groups.reduce(
      (acc, curr) => {
        if (curr.checked) acc.push(curr.name);
        return acc;
      },
      []
    );

    return (
      <div className="create-user-panel-table-row" key={userNumber}>
        <div className="create-user-table-cell" data-title="No.">
          {userNumber + 1}
        </div>
        <div className="create-user-table-cell" data-title="First Name">
          <TextField
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
        <div className="create-user-table-cell" data-title="Last Name">
          <TextField
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
        <div className="create-user-table-cell" data-title="Email">
          <TextField
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
        <div className="create-user-table-cell" data-title="Password">
          <TextField
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
        <div
          style={{ maxWidth: "30%", maxHeight: 150, overflow: "hidden" }}
          className="create-user-table-cell"
          data-title="Groups"
        >
          <FormControl size="small" variant="standard" required={true}>
            <InputLabel id="demo-multiple-checkbox-label">Groups</InputLabel>
            <Select
              name={`usersData[${userNumber}].groups`}
              labelId="demo-multiple-checkbox-label"
              label={selectedGroups.length ? "Groups" : ""}
              id="demo-multiple-checkbox"
              multiple
              value={[""]}
              input={<OutlinedInput label="Groups" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 100,
                    width: 150,
                    marginTop: 60,
                  },
                },
              }}
              renderValue={() => {
                if (selectedGroups.length <= 2)
                  return selectedGroups.join(", ");

                return selectedGroups.slice(0, 2).join(", ") + "...";
              }}
            >
              {groups?.map(({ name }, i) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    id={name}
                    onChange={handleChange}
                    name={`usersData[${userNumber}].groups[${i}].checked`}
                    checked={values.usersData[userNumber].groups[i].checked}
                  />
                  <label htmlFor={name}>
                    {values.usersData[userNumber].groups[i].name}
                  </label>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="create-user-table-cell" data-title="Role">
          <select name={`usersData[${userNumber}].roleId`}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="create-user-table-cell" data-title="">
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
    dispatch(createUserRequest(usersData, setSubmitting));
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  return (
    <>
      <div className="create-user-panel-component">
        <h2 style={{ margin: "15px 0" }}>Create Users</h2>
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
                groups: groupFormik,
                roleId: roles[0]?.id,
              },
            ],
          }}
          validationSchema={addUserSchema}
          onSubmit={(values, { setSubmitting }) =>
            addUser(values, setSubmitting)
          }
        >
          {({
            isSubmitting,
            errors,
            handleBlur,
            touched,
            handleChange,
            values,
          }) => (
            <Form autoCapitalize="off">
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                className="submit-create"
                style={{ marginBottom: "30px" }}
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
                        <div className="create-user-table-cell">Groups</div>
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
                          usersData.length,
                          values
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
                    groups: groupFormik,
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
