import React from "react";
import moment from "moment";
import queryString from "query-string";

const Message = ({ message }) => {
  let isUserClass = "";

  const { name } = queryString.parse(window.location.search);
  if (name === message.user) {
    isUserClass = "IsUser";
  }
  return (
    <div className={`chat__main-messages--message ${isUserClass}`}>
      <p className="chat__main-messages--message-container">
        <span className="chat__main-messages--message-container__name">
          {message.user}
        </span>
        <span className="chat__main-messages--message-container__meta">
          {moment(message.createdAt).format("h:mm a")}
        </span>
      </p>
      <div className="chat__main-speech-bubble">
        <p className="chat__main-speech-bubble--content">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
