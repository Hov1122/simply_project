import React, { useState } from "react";
import "./home.css";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import { usersSelector } from "../../state-management/users/selectors";
import UserCard from "../users/userCard/UserCard";

function Home() {
  const [loading] = useState(false);
  const {
    user: { firstName, lastName },
  } = useSelector(authSelector);
  const { users } = useSelector(usersSelector);

  const getTopStudents = (users) => {
    let topStudents = [...users];
    topStudents.sort((a, b) =>
      a.avgMark < b.avgMark ? 1 : a.avgMark > b.avgMark ? -1 : 0
    );

    return [topStudents[0], topStudents[1], topStudents[2]];
  };

  if (loading) {
    return <Loading />;
  } 

  return (
    <div className="Home-Container">
      <div className="home-title">
        <h1>{`Welcome ${firstName} ${lastName}!`}</h1>
      </div>
      <div className="hompage-content">
        <div className="top-students-title">
          <h3 style={{ marginRight: "50px" }}>Top 3 Students!</h3>
          <CircularProgress
            style={{ marginTop: 10 }}
            variant="determinate"
            value={50}
          />
        </div>
        <hr />
        <div className="top-students-container">
          {getTopStudents(users).map((user) => {
            console.log(user)
            return <UserCard {...user} key={user.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
