import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  return (
    <div className="container">
      <div className="join">
        <h4 className="join__header">
          <span className="join__header-company">Bemoore Communications</span>
          <span className="join__header-welcome">Welcome</span>
        </h4>
        <div className="join__box">
          <div className="join__box__input join__input-name">
            <input
              value={name}
              placeholder="please enter a name"
              type="text"
              className="join__box__input-name--holder"
              onChange={handleNameChange}
            />
          </div>
          <div className="join__box__input join__input-room">
            <input
              value={room}
              placeholder="please enter a room"
              type="text"
              className="join__box__input-room--holder"
              onChange={handleRoomChange}
            />
          </div>
          <div className="join__box__submit">
            <Link to={`/chat?name=${name}&room=${room}`}>
              <button
                disabled={!name || !room}
                type="submit"
                className="join__box__submit-button"
              >
                Join
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
