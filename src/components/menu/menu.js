import React, { useEffect, useState } from "react";
import "./menu.css";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSelector } from "../../state-management/auth/selectors";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutRequest } from "../../state-management/auth/requests";

function Menu() {
  const [loading, setLoading] = useState(true);
  const { user, token } = useSelector(authSelector);
  const [showMenuActive, setShowMenu] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const dispatch = useDispatch();

  if (loading) {
    return <Loading />;
  }

  return token ? (
    <div className="menu">
      <div className="menu-container">
        <nav className={showMenuActive ? "sidebar close" : "sidebar"}>
          <header>
            <div className="image-text">
              <FontAwesomeIcon
                icon={faBars}
                aria-hidden="true"
                className="menu-icon"
                onClick={() => {
                  setShowMenu(!showMenuActive);
                }}
              />
              <div className="text logo-text">
                <span className="name">
                  {user?.role?.name === "Student"
                    ? "Student's "
                    : user?.role?.name === "Teacher"
                    ? "Teacher's "
                    : "Admin's "}
                </span>
                <span className="name">Dashboard</span>
              </div>
            </div>
          </header>
          <div className="menu-bar">
            <div className="menu">
              <li></li>

              <ul className="menu-links">
                <li className="nav-link">
                  <NavLink to="/home">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Home</span>
                  </NavLink>
                </li>

                <li className="nav-link">
                  <NavLink to="/schedule">
                    <i className="bx bx-calendar icon"></i>
                    <span className="text nav-text">Schedule</span>
                  </NavLink>
                </li>

                <li className="nav-link">
                  <NavLink to="/tests">
                    <i className="bx bx-receipt icon"></i>
                    <span className="text nav-text">Tests</span>
                  </NavLink>
                </li>

                <li className="nav-link">
                  <NavLink to="/chat">
                    <i className="bx bx-message-detail icon"></i>
                    <span className="text nav-text">Chat</span>
                  </NavLink>
                </li>

                {user?.role?.name === "Admin" && (
                  <li className="nav-link">
                    <NavLink to="/changeData">
                      <i className="bx bx-user-plus icon"></i>
                      <span className="text nav-text">changeData</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="bottom-content">
              <li
                onClick={() => {
                  dispatch(logoutRequest());
                }}
              >
                <a>
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text">Logout</span>
                </a>
              </li>
            </div>
          </div>
        </nav>
      </div>
    </div>
  ) : null;
}

export default Menu;
