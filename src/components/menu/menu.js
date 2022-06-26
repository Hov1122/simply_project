import React, { useEffect, useState } from "react";
import "./menu.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSelector } from "../../state-management/auth/selectors";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { AnimatePresence, motion } from "framer-motion";

function Menu() {
  const [loading, setLoading] = useState(true);
  const { user, token } = useSelector(authSelector);
  const [showMenuActive, setShowMenu] = useState(true)
  
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return token ? (
    <div className="menu">
        <div className="menu-container">
            <nav className={showMenuActive ? 'sidebar close' : 'sidebar'}>
                <header>
                    <div className="image-text">
                      <FontAwesomeIcon
                        icon={faBars}
                        aria-hidden="true"
                        className="menu-icon"
                        onClick={() => {
                          setShowMenu(!showMenuActive)
                        }}
                      />
                        <div className="text logo-text">
                            <span className="name">{"Students's"}</span>
                            <span className="name">dashboard</span>
                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <li >
                        </li>

                        <ul className="menu-links">
                            <li className="nav-link">
                                <NavLink to="/home">
                                    <i className='bx bx-home-alt icon' ></i>
                                    <span className="text nav-text">Home</span>
                                </NavLink>
                            </li>

                            <li className="nav-link">
                                <NavLink to="/schedule">
                                    <i className='bx bx-calendar icon' ></i>
                                    <span className="text nav-text">Schedule</span>
                                </NavLink>
                            </li>

                            <li className="nav-link">
                                <NavLink to="/tests">
                                    <i className='bx bx-receipt icon'></i>
                                    <span className="text nav-text">Tests</span>
                                </NavLink>
                            </li>

                            {user.role.name === "Admin" && (
                              <li className="nav-link">
                                <NavLink to="/changeData">
                                  <i className='bx bx-user-plus icon' ></i>
                                  <span className="text nav-text">changeData</span>
                                </NavLink>
                              </li>
                            )}
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a>
                                <i className='bx bx-log-out icon' ></i>
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
