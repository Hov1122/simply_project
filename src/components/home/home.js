import React, { useEffect } from "react";
import "./home.css";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { usersSelector } from "../../state-management/users/selectors";
import { testsSelector } from "../../state-management/tests/selectors";
import { fetchUserTestsRequest } from "../../state-management/tests/requests";
import {
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function Home() {
  const { loading } = useSelector(usersSelector);
  const {
    user: {
      id,
      firstName,
      lastName,
      role: { name },
      userTest,
    },
  } = useSelector(authSelector);
  const { users } = useSelector(usersSelector);
  const { userTests } = useSelector(testsSelector);

  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserTestsRequest(id));
  }, [dispatch]);

  const getTopStudents = (users) => {
    let topStudents = [...users];
    topStudents.sort((a, b) =>
      a.avgMark < b.avgMark ? 1 : a.avgMark > b.avgMark ? -1 : 0
    );
    if (topStudents.length >= 3) {
      return [topStudents[0], topStudents[1], topStudents[2]];
    } else {
      return [...topStudents];
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Home-Container">
      <div style={{ height: "75px" }}></div>
      <div className="home-title">
        <h1>{`Welcome back ${firstName} ${lastName}!`}</h1>
      </div>
      {state?.testSubmitted && (
        <span className="test-submitted">{state?.message}</span>
      )}
      <div className="hompage-content">
        {name === "Student" ? (
          <div style={{ padding: "10px", width: "80%", height: "340px" }}>
            <div className="Marks-Chart-Container">
              <h3 style={{ marginLeft: 50 }}>Last 5 Marks Chart</h3>
              <div className="Marks-Chart">
                <ResponsiveContainer width="70%" height="70%">
                  <LineChart
                    data={userTest.map((test, index) => {
                      if (index !== 5) {
                        return {
                          mark: test.mark,
                          index: index + 1,
                        };
                      }
                    })}
                  >
                    <XAxis dataKey="index" tick={{ fontSize: 20 }} />
                    <YAxis dataKey="mark" tick={{ fontSize: 20 }} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="mark" stroke="#8884d8" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="Last-Exams-Container">
            {userTests.length ? (
              <h3 style={{ marginLeft: 50 }}>Last 4 Exams</h3>
            ) : null}
            <hr />
            <div className="Last-Exams-Main">
              {userTests.length ? (
                userTests
                  .slice(userTests.length - 4)
                  .map(({ id, name, highestScore, createdAt }) => {
                    return (
                      <div className="Last-Exam" key={id}>
                        <span>{name}</span>
                        <span>Rating: {highestScore}</span>
                        <span>
                          Created at: {new Date(createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    );
                  })
              ) : (
                <span>You Dont have any Tests</span>
              )}
            </div>
          </div>
        )}
        <div className="top-students-bar">
          <div className="top-students-title">
            <h3 style={{ marginRight: "50px" }}>Top 3 Students!</h3>
          </div>
          <div className="top-students-container">
            {getTopStudents(users).map((user) => {
              return (
                <div
                  className="card-top-user"
                  key={user.id}
                  onClick={() => navigate(`/userProfile/${user.id}`)}
                >
                  <Avatar
                    sx={{ bgcolor: "#2596be", marginTop: "10px" }}
                    variant="rounded"
                  ></Avatar>
                  <div className="top-users-name">
                    <p>
                      <b>{user.firstName}</b>
                    </p>
                    <p>
                      <b>{user.lastName}</b>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Today-Schedule">
        <h3 style={{ marginLeft: 50 }}>{"Today's Schedule"}</h3>
      </div>
      <hr />
    </div>
  );
}

export default Home;
