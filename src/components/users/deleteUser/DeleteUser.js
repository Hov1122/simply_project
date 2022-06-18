import React, { useState, useEffect } from "react";
import "./DeleteUser.css";
import { fetchUsersRequest, deletedUserRequest } from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";


const DeleteUser = () => {
  const [loading] = useState(false);
  const [user, setUser] = useState([])
  const {users} = useSelector(usersSelector)
  const dispatch = useDispatch();

  const UserJSX = ({id, firstName, lastName, group}) => { 
    return (
      <div  key={id} className={`Delete-User-Constainer-Form`}>
        <input type='checkbox' id={id} value={id} onChange={handleChangeUsers} />
        <label htmlFor={id}>{`${firstName} ${lastName}`}</label>
        <span>{group}</span>
      </div>
    )
  }

  const handleChangeUsers = (e) => {
    let updatedList = [...user];
    if (e.target.checked) {
      updatedList = [...user, +e.target.value];
    } else {
      updatedList.splice(user.indexOf(e.target.value), 1);
    }
    setUser(updatedList);
  }

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  const handleDeleteUser = () => {

    const data = {
      ids: user,
    }
    if (!data.ids[0]) {
      console.log('error')
      return 
    } else {
      console.log('success')
      dispatch(deletedUserRequest(data));
    } 
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Delete-User-Container">
      <div className="Delete-User-Container-Header">
        <h2>Delete Users</h2>
      </div>
      <div className="Delete-User-Container-Main">
      {users.map((elem) => {
          return UserJSX(elem);
        })}
      </div>
      <div className="Delete-User-Container-Foot">
        <input value="Delete Users" type="button" onClick={handleDeleteUser} />
      </div>
    </div>
  )
};

export default DeleteUser;
