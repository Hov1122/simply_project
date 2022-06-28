import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Header.css";
import { filterUsersByInput, randomColor } from "../../helpers/helpers";
import { Avatar } from "@mui/material";
import { logoutRequest } from "../../state-management/auth/requests";
import { usersSelector } from "../../state-management/users/selectors";
import { fetchUsersRequest } from "../../state-management/users/requests";
import SearchResults from "./searchResults/SearchResults";
import Loading from "../common/Loading";
import { HeaderPagePart } from "./helper";

const Header = () => {
  const [color] = useState(randomColor());
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const [showFoundUsers, setShowFoundUsers] = useState(false);
  const dropDownRef = useRef(null);

  const {
    token,
    user: { firstName, image },
  } = useSelector(authSelector);

  const { users } = useSelector(usersSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.removeEventListener("click", closeDropDown);

    token && dispatch(fetchUsersRequest());
  }, [token, dispatch]);

  const closeDropDown = (e) => {
    if (!dropDownRef || !dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  return token ? (
    <div
      style={{ position: "relative", marginLeft: "25px", marginTop: "15px" }}
    >
      <div className="Header-Container blur">
        <HeaderPagePart />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "45%",
          }}
        >
          <div className="search-bar-container">
            <div className="searchField">
              <SearchOutlinedIcon
                style={{ margin: "auto", marginLeft: "5px" }}
              />
              {loading && (
                <div className="Search-Loading">
                  <Loading width={"16px"} height={"16px"} />
                </div>
              )}
              <input
                value={searchValue}
                className="search-bar"
                placeholder="Search User"
                onFocus={() => setShowFoundUsers(true)}
                onBlur={() => setShowFoundUsers(false)}
                onInput={(e) => {
                  setSearchValue(e.target.value);
                  setLoading(true);

                  setTimeout(() => {
                    setFoundUsers(filterUsersByInput(users, e.target.value));
                    setLoading(false);
                  }, 500);
                }}
              />
            </div>
            {showFoundUsers && searchValue.length ? (
              <SearchResults foundUsers={foundUsers} />
            ) : null}
          </div>
          <div className="profile-picture-dropdown">
            {!image ? (
              <div className="avatar-name">
                <div className="firstName">
                  <b>{firstName}</b>
                </div>
                <Avatar
                  sx={{
                    bgcolor: color,
                    height: "40px",
                    width: "40px",
                  }}
                  className="profile-picture"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropDown(true);
                    document.addEventListener("click", closeDropDown);
                  }}
                >
                  {firstName.charAt(0)}
                </Avatar>
              </div>
            ) : (
              <img className="profile-picture" src={image} />
            )}
            {showDropDown && (
              <div className="profile-dropdown" ref={dropDownRef}>
                <span
                  onClick={() => {
                    navigate("/myProfile");
                    setShowDropDown(false);
                  }}
                >
                  My Profile
                </span>
                <span
                  onClick={() => {
                    dispatch(logoutRequest());
                  }}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Header;
