import React, { useState } from "react";
import "./Home.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";

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
      <h1 className="home-title">{`Welcome ${firstName} ${lastName}!`}</h1>
    </div>
  );
}

export default Home;
