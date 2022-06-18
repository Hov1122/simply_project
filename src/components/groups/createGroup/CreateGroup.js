import React, { useState, useEffect } from "react";
import "./CreateGroup.css";
import { createGroupRequest } from "../../../state-management/groups/requests";
import { fetchUsersRequest } from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";



const CreateGroup = () => {
  const [loading] = useState(false);
  const [group, setGroup] = useState(null)
  const [groupUsers, setGroupUsers] = useState([])
  const {users} = useSelector(usersSelector)
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
      users: groupUsers
    }

    if (!data.users[0] || !data.name) {
      console.log('error')
      return 
    } else {
      console.log('success')
      dispatch(createGroupRequest(data));
    } 
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Create-Group-Container">
      <div className="Create-Group-Container-Header">
        <h2>Create Group</h2>
        <input type='text' placeholder="Group Name" onChange={handleChangeGroup} />
      </div>
      <div className="Create-Group-Container-Main">
      {users.map((elem) => {
        if (elem.role.name === 'Student')
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
