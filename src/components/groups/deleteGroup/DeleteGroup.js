import React, { useState, useEffect } from "react";
import "./DeleteGroup.css";
import {
  fetchGroupsRequest,
  deleteGroupRequest,
} from "../../../state-management/groups/requests";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { filterGroupsByInput } from "../../../helpers/helpers";
import { Alert } from "@mui/material";

const DeleteGroup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [group, setGroup] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { groups, error } = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const [filteredGroups, setfilteredGroups] = useState(groups);

  useEffect(() => {
    dispatch(fetchGroupsRequest());
  }, []);

  const GroupJSX = ({ id, name }) => {
    return (
      <div id="checklist" key={id}>
        <input
          id={id}
          type="checkbox"
          value={id}
          onChange={handleChangeGroups}
        />
        <label htmlFor={id}>
          <b>{name}</b>
        </label>
      </div>
    );
  };

  const handleChangeGroups = (e) => {
    let updatedList = [...group];
    if (e.target.checked) {
      updatedList = [...group, +e.target.value];
    } else {
      updatedList.splice(group.indexOf(e.target.value), 1);
    }
    setGroup(updatedList);
  };

  const handleDeleteGroup = () => {
    const data = {
      ids: group,
    };
    if (!data.ids[0]) {
      return;
    } else {
      dispatch(deleteGroupRequest(data));
      setSuccess(!error);
    }
  };

  return (
    <div className="Delete-Group-Container">
      <div className="Delete-Group-Container-Header">
        <h2 style={{ marginBottom: "25px" }}>Delete Groups</h2>
        <div className="search-field-container">
          <TextField
            id="outlined-basic"
            label="Search group..."
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setLoading(true);
              setTimeout(() => {
                setfilteredGroups(filterGroupsByInput(groups, e.target.value));
                setLoading(false);
              }, 500);
            }}
          />
          {success && <Alert severity="success">Groups deleted successfully!</Alert>}
          {success && error && <Alert severity="error">Something went wrong!</Alert>}
          <div className="loading-search-bar">
            {loading && <Loading width="20px" height="20px" />}
          </div>
        </div>
      </div>
      <div className="Delete-Group-Container-Main">
        <div className="delete-table-wrapper">
          {filteredGroups.length
            ? filteredGroups.map((elem) => {
                return GroupJSX(elem);
              })
            : groups.map((elem) => {
                return GroupJSX(elem);
              })}
        </div>
      </div>
      <div className="Delete-Group-Container-Foot">
        <input
          value="Delete Groups"
          type="button"
          onClick={handleDeleteGroup}
        />
      </div>
    </div>
  );
};

export default DeleteGroup;
