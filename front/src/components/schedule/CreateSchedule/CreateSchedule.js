import React, { useEffect, useRef, useState } from "react";
import "./CreateSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { createScheduleRequest } from "../../../state-management/schedule/requests";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { authSelector } from "../../../state-management/auth/selectors";
import { groupsSelector } from "../../../state-management/groups/selectors";
import { v4 as uuidv4 } from "uuid";

import Select from "react-select";
import { Alert } from "@mui/material";

function ScheduleCreater() {
  const [loading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [scheduleGroup, setScheduleGroup] = useState(null);

  const {
    user: {
      userGroup,
      role: { name },
    },
  } = useSelector(authSelector);
  const { groups } = useSelector(groupsSelector);
  const { subjects } = useSelector(subjectsSelector);
  const dispatch = useDispatch();
  const container = useRef(null);

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  const subjectsArr = subjects.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [scheduleSubjects, setScheduleSubjects] = useState(
    days.map(() => ({
      "2022-06-20T09:30:47.418Z": 1,
      "2022-06-20T11:10:47.418Z": 1,
      "2022-06-20T13:00:47.418Z": 1,
      "2022-06-20T14:40:47.418Z": 1,
      "2022-06-20T16:20:47.418Z": 1,
    }))
  );

  const groupsArr =
    name === "Admin"
      ? groups.map(({ name, id }) => {
          return {
            value: id,
            label: name,
          };
        })
      : userGroup.map(({ group }) => {
          return {
            value: group.id,
            label: group.name,
          };
        });

  let day = -1;

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" key={day} data-value={days[day]}>
        <h3>{days[day]}</h3>
        {Object.keys(scheduleSubjects[0]).map((time) => (
          <Select
            options={subjectsArr}
            defaultValue={{
              label: "Free Class",
              value: subjectsArr?.[0]?.value,
            }}
            key={uuidv4()}
            onChange={(e) => {
              handleChangeSubject(day, time, e);
            }}
          />
        ))}
      </div>
    );
  };

  const handleChangeSubject = (day, pos, e) => {
    setScheduleSubjects((elem) => {
      elem[day][pos] = e.value;
      return elem;
    });
  };

  const handleChangeGroup = (e) => {
    setScheduleGroup(e.value);
  };

  // ADD SCHEDULE IN DATABASE
  const addSchedule = () => {
    const data = {
      groupId: scheduleGroup,
      schedule: [],
    };

    scheduleSubjects.forEach((elem, index) => {
      data.schedule.push({
        day: index + 1,
        scheduleSubject: Object.keys(elem).map((item) => {
          return {
            time: item,
            subjectId: elem[item],
          };
        }),
      });
    });

    if (
      Object.values(scheduleSubjects).some((value) =>
        Object.values(value).every((item) => item === subjectsArr?.[0]?.value)
      ) ||
      !data.groupId
    ) {
      setRequestError("Select at least one subject for each day");
      setSuccess(null);
    } else {
      setSuccess("Schedule added");
      setRequestError(null);
      dispatch(createScheduleRequest(data));
    }
    setScheduleSubjects(
      days.map(() => ({
        "2022-06-20T09:30:47.418Z": 1,
        "2022-06-20T11:10:47.418Z": 1,
        "2022-06-20T13:00:47.418Z": 1,
        "2022-06-20T14:40:47.418Z": 1,
        "2022-06-20T16:20:47.418Z": 1,
      }))
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <div ref={container} className="Schedule-Container-Header">
        <h2>Create Schedule</h2>
        {success && !requestError && (
          <Alert severity="success">{success}</Alert>
        )}
        {requestError && <Alert severity="error">{requestError}</Alert>}
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
      <div className="Schedule-Container-Foot">
        <button className="create-schedule-button" onClick={addSchedule}>
          {"Create Schedule"}
        </button>
      </div>
    </div>
  );
}

export default ScheduleCreater;
