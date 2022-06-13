import React, { useState } from "react";
import "./home.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import CircularProgress from '@mui/material/CircularProgress';




function Home() {
  const [loading] = useState(false);
  const {
    user: { firstName, lastName },
  } = useSelector(authSelector);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Home-Container">
      <div className="home-title"><h1>{`Welcome ${firstName} ${lastName}!`}</h1></div>
      <div className="hompage-content">
        <div className="marks-box">
          <h3>Last exam marks.</h3>
          <hr />

        </div>
        <CircularProgress variant="determinate" value={50} />
      </div>
    </div>
  );
}

export default Home;
