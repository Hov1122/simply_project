import React, { useEffect, useState } from "react";
import "./ShowSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { fetchSchedulesRequest } from "../../../state-management/schedule/requests";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { schedulesSelector } from "../../../state-management/schedule/selectors";
import Select from "react-select";

function ShowSchedule() {
  const [loading] = useState(false);
  const { subjects } = useSelector(subjectsSelector);
  const { groups } = useSelector(groupsSelector);
  const data = useSelector(schedulesSelector);
  const dispatch = useDispatch();
  const [scheduleGroup, setScheduleGroup] = useState(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let day = -1;

  const groupsArr = groups.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  console.log(data)
  console.log(scheduleGroup)
  console.log(subjects,'subjects');
  console.log(groups,'groups');
  // console.log(schedule,'schedule');

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" key={day} data-value={days[day]}>
        <h3>{days[day]}</h3>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  const handleChangeGroup = (e) => {
    setScheduleGroup(e.value);
  };

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
    dispatch(fetchSchedulesRequest());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <div className="Schedule-Container-Header">
        <h2>Schedule</h2>
        <Select
          options={groupsArr}
          placeholder="Group"
          onChange={handleChangeGroup}
        />
      </div>
      <div className="Schedule-Container-Main">
        {days.map(() => {
          day += 1;
          return daySchedule(day);
        })}
      </div>
    </div>
  );
}

export default ShowSchedule;
