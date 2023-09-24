import React, { useState } from "react";

export default function todoitem({ title, deletehandler }) {
  const itemtitle = { title };
  return (
    <li>
      <span className="name">{title}</span>
      <button
        onClick={() => {
          deletehandler(itemtitle);
        }}
        className="delete"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </li>
  );
}
