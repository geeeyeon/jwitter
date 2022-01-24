import React from "react";
import { dbService } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react/cjs/react.development";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);

  const onDeleteClick = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this jweet?");
    const TextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    if (ok) {
      await deleteDoc(TextRef);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const TextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    await updateDoc(TextRef, {
      text: newJweet,
    });
    toggleEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your jweet"
              value={newJweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Jweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
