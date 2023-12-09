import React, { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  let btnCaption = "Edit";

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = <input type="text" value={name} required />;
    btnCaption = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}