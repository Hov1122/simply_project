import React, { useEffect, useState } from "react";
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
import { fetchGroupScheduleRequest } from "../../state-management/schedule/requests";
import { schedulesSelector } from "../../state-management/schedule/selectors";
import { addTime, randomColor } from "../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";
import { getTopStudentsRequest } from "../../state-management/users/requests";

function Home() {
  const [loading, setLoading] = useState(false);
  const {
    user: {
      id,
      firstName,
      lastName,
      role: { name },
      userTest,
      userGroup,
    },
  } = useSelector(authSelector);
  const { topStudents } = useSelector(usersSelector);
  const { userTests } = useSelector(testsSelector);
  const { groupSchedules } = useSelector(schedulesSelector);

  const group = userGroup[0]?.group?.id;
  const times = ["9:30", "11:10", "13:00", "14:40", "16:20"];

  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getTopStudentsRequest());
    dispatch(fetchUserTestsRequest(+id));
    dispatch(fetchGroupScheduleRequest(group));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Home-Container">
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
              <h3 style={{ marginLeft: 50, marginBottom: 20 }}>
                Last 5 Marks Chart
              </h3>
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
            {topStudents.map((user) => {
              return (
                <div
                  className="card-top-user"
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
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
      <div style={{ padding: "0 20px 0 5px" }}>
        <div className="Today-Schedule">
          <h3 style={{ marginLeft: 50, marginBottom: 20 }}>
            {"Today's Schedule"}
          </h3>
          {userGroup.length ? (
            <div className="Schedule-Container">
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr className="bg-light-gray">
                      <th className="text-uppercase">9:30</th>
                      <th className="text-uppercase">11:10</th>
                      <th className="text-uppercase">13:00</th>
                      <th className="text-uppercase">14:40</th>
                      <th className="text-uppercase">16:20</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {groupSchedules.map(({ day, scheduleSubject }) => {
                        if (day !== new Date().getDay()) return;

                        return scheduleSubject.map(
                          ({ subject: { name } }, index) => {
                            if (name === "Free class") {
                              return (
                                <td
                                  style={{ backgroundColor: "#f7f7f7" }}
                                  key={uuidv4()}
                                ></td>
                              );
                            }

                            return (
                              <td key={uuidv4()}>
                                <span
                                  style={{
                                    backgroundColor: randomColor(),
                                    color: "#ffff",
                                  }}
                                  className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13"
                                >
                                  {name}
                                </span>
                                <div className="margin-10px-top font-size14">
                                  {times[index]}-{addTime(times[index], 90)}
                                </div>
                              </td>
                            );
                          }
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <span>You Dont Have Schedule For Today</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
