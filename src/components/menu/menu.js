import React, { useEffect, useState } from "react";
import "./menu.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSelector } from "../../state-management/auth/selectors";
import { AnimatePresence, motion } from "framer-motion";

function Menu({ showMenu }) {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector(authSelector);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return token ? (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          className={`menu`}
          key="menu"
          initial={{ x: "-10vw" }}
          animate={{ x: 0, transition: { ease: "easeInOut", duration: 0.5 } }}
          exit={{ x: "-10vw", transition: { ease: "easeIn", duration: 0.5 } }}
        >
          <NavLink to="/home">
            <button>Home</button>
          </NavLink>

          <NavLink to="schedule">
            <button>Schedule</button>
          </NavLink>

          <NavLink to="tests">
            <button>Tests</button>
          </NavLink>
        </motion.div>
      )}
    </AnimatePresence>
  ) : null;
}

export default Menu;
