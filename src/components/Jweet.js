import React from "react";
import { dbService, storageService } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react/cjs/react.development";
import { deleteObject, ref } from "firebase/storage";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jweet?");
    const TextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    if (ok) {
      await deleteDoc(TextRef);
      const urlRef = ref(storageService, jweetObj.attachmentUrl);
      await deleteObject(urlRef);
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
    <div className="border-gray-300 border-t border-x py-2 px-2">
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
            <input
              className="border border-gray-400 rounded-2xl text-sm"
              type="submit"
              value="Update Jweet"
            />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && (
            <div className="border border-gray-400 rounded-md px-2 py-2 my-2">
              <img src={jweetObj.attachmentUrl} className="flex" />
            </div>
          )}
          {isOwner && (
            <>
              <div className="flex-row w-full justify-between text-right">
                <button
                  className="mr-1 border-gray-500 border rounded-2xl px-2 py-1 text-xs"
                  onClick={toggleEditing}
                >
                  수정
                </button>
                <button
                  className="bg-gray-600 rounded-2xl px-2 py-1 text-white text-xs"
                  onClick={onDeleteClick}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
