import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";

//=============
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from '@material-ui/core/Avatar';
import Fab from "@material-ui/core/Fab";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";

//==============
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [messageValue, setMessageValue] = useState("");
  const {
    user,
  } = useSelector(authSelector);
  const {userGroup} = user
  
  const [currentGroup, setCurrentGroup] = useState(userGroup[0]?.group.id);

  const messageAreaRef = useRef(null);

  useEffect(() => {
    messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    userGroup.forEach(({group}) => {
      console.log('a')
      socket.emit("join_chat", { groupId: group.id });
    })
    // if (currentGroup)
    //   socket.emit("join_chat", { groupId: currentGroup });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data)
        alert(data.text);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", {
      text: messageValue,
      groupId: currentGroup,
      senderId: user.id
    });
  };

  return (
    <div className="chat">
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
                    button
                    key={el.group.id}
                    onClick={() => {
                      setCurrentGroup(el.group.id);
                    }}
                    className={!index ? "active-chat" : ""}
                  >
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.group.name}></ListItemText>
                  </ListItem>
                );
              })}
            </div>
          </List>
        </Grid>
        <Grid item xs={9} className="message-bar">
          <List className="messageArea" ref={messageAreaRef}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="MESSAGE TO"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="MESSAGE TO"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="MESSAGE TO"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="MESSAGE TO"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="MESSAGE TO"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="MESSAGE FROM"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="TIME"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
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
