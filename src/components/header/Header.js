import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/images/search.png";
import "./Header.css";
import { randomColor } from "../../helpers/helpers";
import { Avatar } from "@mui/material";
import { logoutRequest } from "../../state-management/auth/requests";

const Header = ({ setShowMenu }) => {
  const [color, setColor] = useState(randomColor());
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  const {
    token,
    user: { firstName },
  } = useSelector(authSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.removeEventListener("click", closeDropDown);
  }, []);

  const closeDropDown = (e) => {
    if (!dropDownRef || !dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  return token ? (
    <div className="Header-Container">
      <FontAwesomeIcon
        icon={faBars}
        className="menu-icon"
        onClick={() => {
          setShowMenu((oldState) => !oldState);
        }}
      />
      <div className="search-bar-container">
        <img src={searchIcon} alt="" className="search-icon" />
        <input className="search-bar" placeholder="Search User" />
      </div>
      <div className="profile-picture-dropdown">
        <Avatar
          sx={{ bgcolor: color }}
          className="profile-picture"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropDown(true);
            document.addEventListener("click", closeDropDown);
          }}
        >
          {firstName.charAt(0)}
        </Avatar>
        {showDropDown && (
          <div className="profile-dropdown" ref={dropDownRef}>
            <span
              onClick={() => {
                navigate("/profile");
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
  ) : null;
};

export default Header;
