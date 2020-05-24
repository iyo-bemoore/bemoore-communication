import React from "react";
import moment from "moment";
const Message = ({ message }) => (
  <div class="chat__main-messages--message">
    <p class="chat__main-messages--message-container">
      <span class="chat__main-messages--message-container__name">
        {message.user}
      </span>
      <span class="chat__main-messages--message-container__meta">
        {moment(message.createdAt).format("h:mm a")}
      </span>
    </p>
    <div class="chat__main-speech-bubble">
      <p class="chat__main-speech-bubble--content">{message.text}</p>
    </div>
  </div>
);

export default Message;
