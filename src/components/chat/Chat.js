import React, { useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [messageValue, setMessageValue] = useState("");

  const {
    user: { userGroup },
  } = useSelector(authSelector);

  useEffect(() => {
    socket.emit("join_chat", userGroup[0].id);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", {
      message: messageValue,
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ height: 75 }}></div>
      <div className="Chat-Container">
        <input
          placeholder="Message"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;
