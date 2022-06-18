import React, { useState, useEffect } from "react";
import "./DeleteGroup.css";
import { fetchGroupsRequest, deleteGroupRequest } from "../../../state-management/groups/requests";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";


const DeleteGroup = () => {
  const [loading] = useState(false);
  const [group, setGroup] = useState([])
  const {groups} = useSelector(groupsSelector)
  const dispatch = useDispatch();

  const GroupJSX = ({id, name}) => { 
    return (
      <div  key={id} className={`Delete-Group-Constainer-Form`}>
        <input type='checkbox' id={id} value={id} onChange={handleChangeGroups} />
        <label htmlFor={id}>{name}</label>
      </div>
    )
  }

  const handleChangeGroups = (e) => {
    let updatedList = [...group];
    if (e.target.checked) {
      updatedList = [...group, +e.target.value];
    } else {
      updatedList.splice(group.indexOf(e.target.value), 1);
    }
    console.log(updatedList)
    setGroup(updatedList);
  }

  useEffect(() => {
    dispatch(fetchGroupsRequest());
  }, []);

  const handleDeleteGroup = () => {

    const data = {
      ids: group,
    }
    if (!data.ids[0]) {
      console.log('error')
      return 
    } else {
      console.log('success')
      dispatch(deleteGroupRequest(data));
    } 
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Delete-Group-Container">
      <div className="Delete-Group-Container-Header">
        <h2>Delete Group</h2>
      </div>
      <div className="Delete-Group-Container-Main">
      {groups.map((elem) => {
          return GroupJSX(elem);
        })}
      </div>
      <div className="Delete-Group-Container-Foot">
        <input value="Delete Groups" type="button" onClick={handleDeleteGroup} />
      </div>
    </div>
  )
};

export default DeleteGroup;
