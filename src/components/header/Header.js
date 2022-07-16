import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Header.css";
import { randomColor } from "../../helpers/helpers";
import { Avatar } from "@mui/material";
import { logoutRequest } from "../../state-management/auth/requests";
import { usersSelector } from "../../state-management/users/selectors";
import { fetchUsersRequest } from "../../state-management/users/requests";
import SearchResults from "./searchResults/SearchResults";
import Loading from "../common/Loading";
import { HeaderPagePart } from "./helper";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { debounce } from "@material-ui/core";
import io from "socket.io-client";

export let socket = io.connect("http://localhost:5000");

const Header = () => {
  const [color] = useState(randomColor());
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showFoundUsers, setShowFoundUsers] = useState(false);
  const dropDownRef = useRef(null);

  const {
    token,
    user: { id, firstName, image },
  } = useSelector(authSelector);
  const { users } = useSelector(usersSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.removeEventListener("click", closeDropDown);
  }, []);

  useEffect(() => {
    console.log(id);
    socket = io.connect("http://localhost:5000");
    id && socket.emit("login", { id });
  }, [id]);

  const closeDropDown = (e) => {
    if (!dropDownRef || !dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  const handleSearch = debounce((search) => {
    setLoading(true);
    dispatch(fetchUsersRequest({ search }));

    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return token ? (
    <div
      style={{
        position: "relative",
        marginLeft: "25px",
        marginTop: "15px",
        zIndex: 1100,
      }}
    >
      <div className="Header-Container blur">
        <HeaderPagePart />
        <div className="header-input-avatar-container">
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
                  handleSearch(e.target.value);
                }}
              />
            </div>
            {showFoundUsers && searchValue.length ? (
              <SearchResults foundUsers={users} />
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
                  style={{ display: "flex", justifyContent: "space-between" }}
                  onClick={() => {
                    navigate(`/profile/${id}`);
                    setShowDropDown(false);
                  }}
                >
                  <SettingsIcon />
                  Settings
                </span>
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                  onClick={() => {
                    socket.disconnect();
                    dispatch(logoutRequest());
                  }}
                >
                  <LogoutIcon />
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
