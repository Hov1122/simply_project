import React, { useState } from "react";
import "./schedule.css";
import Loading from "../common/Loading";
import ScheduleCreater from "./CreateSchedule/CreateSchedule";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import ShowSchedule from "./ShowSchedule/ShowSchedule";

function Schedules() {
  const [loading] = useState(false);

  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule">
      <div className="Schedule-bar">
        <div className="Schedule-Container-parrent">
          {name === "Student" ? (
            <ShowSchedule />
          ) : name === "Teacher" ? (
            <div>
              <ScheduleCreater />
              <ShowSchedule />
            </div>
          ) : (
            <ScheduleCreater />
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedules;
