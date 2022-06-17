import React, { useState } from "react";
import "./schedule.css";
import Loading from "../common/Loading";
import ScheduleCreater from "./CreateSchedule/CreateSchedule";

function Schedules() {
  const [loading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <ScheduleCreater />
    </div>
  );
}

export default Schedules;
