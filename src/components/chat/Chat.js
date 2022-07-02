import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";

import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { messagesSelector } from "../../state-management/chat/selectors";
import { groupsSelector } from "../../state-management/groups/selectors";
import { fetchGroupUsers } from "../../state-management/groups/requests";
import { fetchGroupsMessages } from "../../state-management/chat/requests";
import { addUserMessage } from "../../state-management/chat/actions";
import UsersDropDown from "./usersDropDown/UsersDropDown";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [messageValue, setMessageValue] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const { user } = useSelector(authSelector);
  const { userGroup } = user;

  const [currentGroup, setCurrentGroup] = useState(userGroup[0]?.group.id);
  const { messages, loading} = useSelector(messagesSelector);
  console.log(loading)
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
        dispatch(addUserMessage({ data, user: false }));

        setTimeout(() => {
          messageAreaRef.current.scrollTop =
            messageAreaRef.current.scrollHeight;
        }, 0);
      }
    });
    socket.on("message_sent", (data) => {
      if (data) {
        dispatch(addUserMessage({ data, user: true }));
        setTimeout(() => {
          messageAreaRef.current.scrollTop =
            messageAreaRef.current.scrollHeight;
        }, 0);
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(fetchGroupsMessages({ groupId: currentGroup, initialise: true }));
    setTimeout(() => {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }, 100);
  }, [currentGroup]);

  const loadOnScroll = () => {
    if (messageAreaRef.current.scrollTop === 0 && messages.length) {
      const prevHeight = messageAreaRef.current.scrollHeight;
      dispatch(
        fetchGroupsMessages({ groupId: currentGroup, skip: messages.length })
      );
      setTimeout(() => {
        messageAreaRef.current.scrollTop =
          messageAreaRef.current.scrollHeight - prevHeight - 100;
      }, 100);
    }
  };

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
              {userGroup.map((el) => {
                return (
                  <div
                    className={"group-list-item " +(currentGroup === el.group.id ? "active-chat" : "")}
                    key={el.group.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGroup(el.group.id);
                    }}
                  >
                      <div className="group-chat-name">
                        <GroupIcon />
                        <h3 style={{ marginLeft: "5px" }}>{el.group.name}</h3>
                      </div>
                      <div 
                        style={{ display: "flex", marginLeft: "10px" }}
                        onClick={() => setShowUsers(true)}
                      >
                        <GroupIcon sx={{ fontSize: "15px" }} />
                        <span style={{ marginLeft: "5px", marginTop: "-5px"}}>{groupUsers[el.group.id]?.length}</span>
                      </div>
                  </div>
                );
              })}
            </div>
          </List>
        </Grid>
        <Grid item xs={9} className="message-bar">
          <List
            className="messageArea"
            ref={messageAreaRef}
            onScroll={loadOnScroll}
          >
            {messages?.map(({ data, user }) => {
              const date = new Date(data?.createdAt);
              const time = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <ListItem key={data.id}>
                  <div className={"message " + (user ? "right" : "")}>
                    <div>
                      {!user &&  
                        <div>
                          <div>
                            <span className="user-role">{data.sender?.role.name}</span>
                            <span className="user-name"><b>{data.sender?.firstName} {data.sender?.lastName} </b></span>
                          </div>
                        </div>
                      }
                      <div className={"sended-message-box " + (user ? "right" : "")}>
                        <div className={user ? "sended-messages" : "recived-messages"}>{data.text}</div>
                      </div>
                      <div className={user ? "right" : ""}>
                        <div>{time}</div>
                      </div>
                    </div>
                  </div>
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
