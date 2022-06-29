import React, { useState, useEffect } from "react";
import "./CreateGroup.css";
import { createGroupRequest } from "../../../state-management/groups/requests";
import { fetchUsersRequest } from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { Alert } from "@mui/material";
import { TextField } from "@material-ui/core";



const CreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [group, setGroup] = useState(null)
  const [groupUsers, setGroupUsers] = useState([])
  const {users} = useSelector(usersSelector)
  const {error} = useSelector(groupsSelector)
  const dispatch = useDispatch();

  const UserJSX = ({id, firstName, lastName}) => { 
    return (
      <div key={id} className={`Create-Group-Constainer-Users`}>
        <input type='checkbox' value={id} onChange={handleChangeGroupUsers} />
        <span>{`${firstName} ${lastName}` }</span>
      </div>
    )
  }

  const handleChangeGroupUsers = (e) => {
    let updatedList = [...groupUsers];
    if (e.target.checked) {
      updatedList = [...groupUsers, +e.target.value];
    } else {
      updatedList.splice(groupUsers.indexOf(e.target.value), 1);
    }
    setGroupUsers(updatedList);
  }

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  const handleChangeGroup = (e) => {
    setGroup(e.target.value)
  }

  const addGroup = () => {

    const data = {
      name: group,
    }
    setLoading(true);
    dispatch(
      createGroupRequest(data)
    );

    setTimeout(() => {
      error
        ? setSuccess("")
        : setSuccess("Password changed successfully");
      setLoading(false);
    }, 2000);

    setGroup("");

  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Create-Group-Container">
      <div className="Create-Group-Container-Header">
        <h2 style={{marginBottom: "20px"}}>Create Group</h2>
        {success && !error && (
          <Alert severity="success">Group created successfully!</Alert>
        )}
        {error && (
           <Alert severity="error">Creating group faild!</Alert>
        )}
        <TextField id="outlined-basic" label="Group name" variant="outlined"  onChange={handleChangeGroup} />
      </div>
      <div className="Create-Group-Container-Main">
      {users.map((elem) => {
        if (elem?.role?.name === 'Student')
          return UserJSX(elem);
        })}
      </div>
      <div className="Create-Group-Container-Foot">
        <input value="Add Group" type="button" onClick={addGroup} />
      </div>
    </div>
  )
};

export default CreateGroup;
