import React, { useEffect, useState } from "react";
import "./CreateSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { createScheduleRequest } from "../../../state-management/schedule/requests";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { groupsSelector } from "../../../state-management/groups/selectors";
import Select from "react-select";

function ScheduleCreater() {
  const [loading] = useState(false);
  const { subjects } = useSelector(subjectsSelector);
  const { groups } = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const [scheduleGroup, setScheduleGroup] = useState(null);
  const [scheduleSubjects, setScheduleSubjects] = useState([
    {
      "2022-06-20T09:40:47.418Z": undefined,
      "2022-06-20T11:10:47.418Z": undefined,
      "2022-06-20T13:00:47.418Z": undefined,
      "2022-06-20T14:40:47.418Z": undefined,
    },
    {
      "2022-06-20T09:40:47.418Z": undefined,
      "2022-06-20T11:10:47.418Z": undefined,
      "2022-06-20T13:00:47.418Z": undefined,
      "2022-06-20T14:40:47.418Z": undefined,
    },
    {
      "2022-06-20T09:40:47.418Z": undefined,
      "2022-06-20T11:10:47.418Z": undefined,
      "2022-06-20T13:00:47.418Z": undefined,
      "2022-06-20T14:40:47.418Z": undefined,
    },
    {
      "2022-06-20T09:40:47.418Z": undefined,
      "2022-06-20T11:10:47.418Z": undefined,
      "2022-06-20T13:00:47.418Z": undefined,
      "2022-06-20T14:40:47.418Z": undefined,
    },
    {
      "2022-06-20T09:40:47.418Z": undefined,
      "2022-06-20T11:10:47.418Z": undefined,
      "2022-06-20T13:00:47.418Z": undefined,
      "2022-06-20T14:40:47.418Z": undefined,
    },
  ]);

  const subjectsArr = subjects.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });
  const groupsArr = groups.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let day = -1;
  let subjectId = [0, 1, 2, 3];

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" key={day} data-value={days[day]}>
        <h3>{days[day]}</h3>
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[0]}
          onChange={(e) => {
            handleChangeSubject(day, "2022-06-20T09:40:47.418Z", e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[1]}
          onChange={(e) => {
            handleChangeSubject(day, "2022-06-20T11:10:47.418Z", e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[2]}
          onChange={(e) => {
            handleChangeSubject(day, "2022-06-20T13:00:47.418Z", e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[3]}
          onChange={(e) => {
            handleChangeSubject(day, "2022-06-20T14:40:47.418Z", e);
          }}
        />
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

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

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
        Object.values(value).every((item) => item != true)
      ) ||
      !data.groupId
    ) {
      console.log('error');
      return;
    } else {
      console.log("success");
      dispatch(createScheduleRequest(data));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <div className="Schedule-Container-Header">
        <h2>Create Schedule</h2>
        <Select
          options={groupsArr}
          placeholder="Group"
          onChange={handleChangeGroup}
        />
      </div>
      <div className="Schedule-Container-Main">
        {days.map(() => {
          day += 1;
          subjectId.forEach((elem) => elem + 4);
          return daySchedule(day);
        })}
      </div>
      <div className="Schedule-Container-Foot">
        <button className="create-schedule-button" onClick={addSchedule}>{"Create Schedule"}</button>
      </div>
    </div>
  );
}

export default ScheduleCreater;
