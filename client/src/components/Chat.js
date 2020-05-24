import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Message from "./chat_components/Message";
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ENDPOINT = "localhost:8000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {
      console.log(error);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (socketMessage) => {
      setMessages([...messages, socketMessage]);
      console.log(socketMessage);
    });
  }, [messages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = (event) => {
    console.log("button clicked");
    event.preventDefault();
    socket.emit("sendMessage", message, () => {
      console.log(message);
      setMessage("");
    });
  };
  const renderMessages = () => {
    console.log("from render messages", messages);
    return messages.map((message) => <Message message={message} />);
  };

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <div className="chat__sidebar-container">
          <h2 className="chat__sidebar-container--room">
            {room.toUpperCase()}
          </h2>
          <div className="chat__sidebar-container--img"></div>
        </div>
        <div className="chat__sidebar-members">
          <h3 className="chat__sidebar-members-title">Members</h3>
        </div>
        <ul className="chat__sidebar__users">
          <div className="chat__sidebar__users--user">
            <li className="chat__sidebar__users--user-item">
              <span className="chat__sidebar__users--user-icon"></span>
              <span className="chat__sidebar__users--user-name"> bardo </span>
            </li>
          </div>
        </ul>
      </div>
      <div className="chat__main">
        <div className="chat__main-messages">
          {/* <div className="chat__main-messages--message">
            <p className="chat__main-messages--message-container">
              <span className="chat__main-messages--message-container__name">
                imad
              </span>
              <span className="chat__main-messages--message-container__meta">
                today
              </span>
            </p>
            <div className="chat__main-speech-bubble">
              <p className="chat__main-speech-bubble--content">hello there</p>
            </div>
          </div> */}
          {renderMessages()}
        </div>
        {/* <div className="chat__input"></div> */}
        <div className="chat__compose">
          <form className="chat__compose-form">
            <input
              value={message}
              className="chat__compose-form--input"
              name="message"
              autoComplete="off"
              placeholder="Type something"
              onChange={handleMessageChange}
            />
            <button
              onClick={handleMessageSend}
              className="chat__compose-button"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
