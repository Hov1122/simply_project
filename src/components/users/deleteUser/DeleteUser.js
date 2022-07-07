import React, { useState } from "react";
import "./DeleteUser.css";
import {
  fetchUsersRequest,
  deletedUserRequest,
} from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { debounce } from "../../../helpers/helpers";
import { Alert } from "@mui/material";

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { users, error } = useSelector(usersSelector);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSearchChange = debounce((search) => {
    dispatch(fetchUsersRequest({ search }));
  });

  const userJSX = ({ id, firstName, email, lastName } = {}) => {
    return (
      <div id="checklist" key={id}>
        <input
          id={id}
          type="checkbox"
          value={id}
          onChange={handleChangeUsers}
        />
        <label htmlFor={id}>
          <b>
            {`${firstName} ${lastName}`}
            <span className="user-email-span">{email}</span>
          </b>
        </label>
      </div>
    );
  };

  const handleChangeUsers = (e) => {
    let updatedList = [...user];
    if (e.target.checked) {
      updatedList = [...user, +e.target.value];
    } else {
      updatedList.splice(user.indexOf(e.target.value), 1);
    }
    setUser(updatedList);
  };

  const handleDeleteUser = () => {
    const data = {
      ids: user,
    };

    if (!data.ids[0]) {
      return;
    } else {
      dispatch(deletedUserRequest(data));
      setSuccess(!error);
    }
  };

  return (
    <div className="Delete-User-Container">
      <div className="Delete-User-Container-Header">
        <h2 style={{ marginBottom: "25px" }}>Delete Users</h2>
        <div className="search-field-container">
          <TextField
            id="outlined-basic"
            label="Search user..."
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => {
              handleSearchChange(e.target.value);
              setSearchKeyword(e.target.value);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }}
          />
          {loading && (
            <div className="delete-users-loading">
              <Loading width="16px" height="16px"></Loading>
            </div>
          )}
          {!loading && success && (
            <Alert severity="success">Users deleted successfully!</Alert>
          )}
        </div>
      </div>
      <div className="Delete-User-Container-Main">
        <div className="delete-table-wrapper">
          {users.map((elem) => {
            return userJSX(elem);
          })}
        </div>
      </div>
      <div className="Delete-User-Container-Foot">
        <input value="Delete Users" type="button" onClick={handleDeleteUser} />
      </div>
    </div>
  );
};

export default DeleteUser;
