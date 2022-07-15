import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";

import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { messagesSelector } from "../../state-management/chat/selectors";
import { groupsSelector } from "../../state-management/groups/selectors";
import { fetchGroupUsers } from "../../state-management/groups/requests";
import { fetchGroupsMessages } from "../../state-management/chat/requests";
import { addUserMessage } from "../../state-management/chat/slice";
import UsersDropDown from "./usersDropDown/UsersDropDown";
import Loading from "../common/Loading";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [messageValue, setMessageValue] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [initialising, setIninitalising] = useState(false);
  const [prevHeight, setPrevHeight] = useState(0);
  const { user } = useSelector(authSelector);
  const { userGroup } = user;
  const [filtredGroups, setFiltredGroups] = useState(userGroup);
  const [searchGroupKeyword, setSearchGroupKeyword] = useState("");
  const [currentGroup, setCurrentGroup] = useState(userGroup[0]?.group.id);
  const {
    messages,
    loading: msgLoading,
    hasMore,
  } = useSelector(messagesSelector);
  const messageAreaRef = useRef(null);

  const dispatch = useDispatch();
  const { groupUsers } = useSelector(groupsSelector);

  useEffect(() => {
    userGroup.forEach(({ group }) => {
      socket.emit("join_chat", { groupId: group.id, userId: user.id });
      dispatch(fetchGroupUsers(group.id));
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        dispatch(addUserMessage({ data, user: false }));
      }
    });
    socket.on("message_sent", (data) => {
      if (data) {
        dispatch(addUserMessage({ data, user: true }));
        setIninitalising(true);
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(fetchGroupsMessages({ groupId: currentGroup, initialise: true }));
    setIninitalising(true);
  }, [currentGroup]);

  useEffect(() => {
    if (initialising) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
      setIninitalising(false);
      setPrevHeight(0);
      return;
    }
  }, [initialising]);

  useEffect(() => {
    if (!msgLoading) {
      messageAreaRef.current.scrollTop =
        messageAreaRef.current.scrollHeight - prevHeight - 100;
    }
  }, [msgLoading]);

  const loadOnScroll = () => {
    if (messageAreaRef.current.scrollTop === 0 && messages.length && hasMore) {
      setPrevHeight(messageAreaRef.current.scrollHeight);
      dispatch(
        fetchGroupsMessages({ groupId: currentGroup, skip: messages.length })
      );
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
      {msgLoading && (
        <div className="chat-loading">
          <Loading />
        </div>
      )}
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
              label="Search"
              variant="outlined"
              value={searchGroupKeyword}
              fullWidth
              onChange={(e) => {
                setSearchGroupKeyword(e.target.value);
                const inputChars = e.target.value.split("");
                setFiltredGroups(() => {
                  return userGroup.filter(({ group }) => {
                    return inputChars.every((char) =>
                      group.name.toLowerCase().includes(char.toLowerCase())
                    );
                  });
                });
              }}
            />
          </Grid>
          <Divider />

          <List>
            <div className="group-chats">
              {filtredGroups.map((el) => {
                return (
                  <div
                    className={
                      "group-list-item " +
                      (currentGroup === el.group.id ? "active-chat" : "")
                    }
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
                      <span style={{ marginLeft: "5px", marginTop: "-5px" }}>
                        {groupUsers[el.group.id]?.length}
                      </span>
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
                      {!user && (
                        <div>
                          <div>
                            <span className="user-role">
                              {data.sender?.role.name}
                            </span>
                            <span className="user-name">
                              <b>
                                {data.sender?.firstName} {data.sender?.lastName}{" "}
                              </b>
                            </span>
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          "sended-message-box " + (user ? "right" : "")
                        }
                      >
                        <div
                          className={
                            user ? "sended-messages" : "recived-messages"
                          }
                        >
                          {data.text}
                        </div>
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
              item
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
