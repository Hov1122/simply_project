import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";

import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { groupsSelector } from "../../state-management/groups/selectors";
import { fetchGroupUsers } from "../../state-management/groups/requests";
import UsersDropDown from "./usersDropDown/UsersDropDown";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [messageValue, setMessageValue] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const { user } = useSelector(authSelector);
  const { userGroup } = user;

  const [currentGroup, setCurrentGroup] = useState(userGroup[0]?.group.id);
  const [messages, setMessages] = useState([]);

  const messageAreaRef = useRef(null);

  const dispatch = useDispatch();
  const { groupUsers } = useSelector(groupsSelector);

  useEffect(() => {
    userGroup.forEach(({ group }) => {
      socket.emit("join_chat", { groupId: group.id, userId: user.id });
    });
    messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;

    userGroup.forEach(({ group }) => {
      dispatch(fetchGroupUsers(group.id));
      socket.emit("join_chat", { groupId: group.id });
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        setMessages((messages) => [...messages, { data, user: false }]);
        setTimeout(() => {
          messageAreaRef.current.scrollTop =
            messageAreaRef.current.scrollHeight;
        }, 0);
      }
    });
    socket.on("message_sent", (data) => {
      if (data) {
        setMessages((messages) => [...messages, { data, user: true }]);
        setTimeout(() => {
          messageAreaRef.current.scrollTop =
            messageAreaRef.current.scrollHeight;
        }, 0);
      }
    });
  }, [socket]);

  useEffect(() => {
    setMessages(() => []);
    currentGroup &&
      socket.emit("get_group_messages", {
        groupId: currentGroup,
        userId: user.id,
      });

    socket.on("recieve_group_messages", (data) => {
      if (data.length) {
        setMessages((messages) => [...data, ...messages]);
        setTimeout(() => {
          messageAreaRef.current.scrollTop =
            messageAreaRef.current.scrollHeight;
        }, 0);
      }
    });
  }, [currentGroup]);

  const loadOnScroll = () => {
    if (messageAreaRef.current.scrollTop === 0 && messages.length) {
      socket.emit("get_group_messages", {
        groupId: currentGroup,
        userId: user.id,
        skip: messages.length,
      });
    }
  };

  useEffect(() => {
    messageAreaRef.current.addEventListener("scroll", loadOnScroll);
  }, [messageAreaRef, messages]);

  const sendMessage = () => {
    socket.emit("send_message", {
      text: messageValue,
      groupId: currentGroup,
      senderId: user.id,
    });
  };

  return (
    <div className="chat">
      {showUsers && (
        <UsersDropDown
          users={groupUsers[currentGroup]}
          setShowUsers={setShowUsers}
        />
      )}
      <h5 className="header-message">
        {" "}
        <b>Chat</b>
      </h5>
      <div style={{ height: "20px" }}></div>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={3} className="borderRight500">
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <div className="group-chats">
              {userGroup.map((el, index) => {
                return (
                  <ListItem
                    sx={{ overflow: "auto" }}
                    button
                    key={el.group.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGroup(el.group.id);
                    }}
                    className={!index ? "active-chat" : ""}
                  >
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.group.name}></ListItemText>
                    <ListItemText
                      sx={{ display: "flex", marginLeft: "10px" }}
                      onClick={() => setShowUsers(true)}
                    >
                      <GroupIcon sx={{ fontSize: "15px" }} />
                      {groupUsers[el.group.id]?.length}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </div>
          </List>
        </Grid>
        <Grid item xs={9} className="message-bar">
          <List className="messageArea" ref={messageAreaRef}>
            {messages.map(({ data, user }) => {
              const date = new Date(data?.createdAt);
              const time = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              console.log(date.toLocaleDateString()); // to do add day on top
              return (
                <ListItem key={data.id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={user ? "right" : "left"}
                        secondary={`${data.sender?.firstName} ${data.sender?.lastName}`}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={user ? "right" : "left"}
                        primary={data.text}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={user ? "right" : "left"}
                        secondary={time}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={user ? "right" : "left"}
                        secondary={`${data.sender?.role.name}`}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <Grid
            container
            style={{ padding: "20px" }}
            className="write-message-bar"
          >
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something..."
                fullWidth
                variant="outlined"
                inputProps={{ autoFocus: true }}
                value={messageValue}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" && e.type === "keydown") return;
                  sendMessage();
                  setMessageValue("");
                }}
                onChange={(e) => {
                  setMessageValue(e.target.value);
                }}
              />
            </Grid>
            <Grid
              xs={1}
              align="right"
              onClick={() => {
                sendMessage();
                setMessageValue("");
              }}
            >
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
