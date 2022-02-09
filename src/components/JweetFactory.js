import React, { useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";
import { collection, addDoc } from "firebase/firestore";

const JweetFactoty = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }
    try {
      const jweetPosting = {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        userNickName: userObj.displayName,
        userPhoto: userObj.photoURL,
        attachmentUrl,
      };
      await addDoc(collection(dbService, "jweets"), jweetPosting);
      setJweet("");
      setAttachment("");
    } catch (err) {
      console.log("firestore error", err);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentCLick = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={jweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        multiple={true}
        className="bg-gray-200 px-2 py-2 rounded-md w-full resize-y"
      />
      <div className="w-full flex-row columns-2">
        <div>
          <input
            className="block w-full text-sm text-slate-500
          file:mr-4 file:py-1 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-200 file:text-gray-700
        "
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        <div className="text-right">
          <button
            className="text-sm text-white bg-gray-600 px-2 rounded-sm"
            onClick={onClearAttachmentCLick}
          >
            Clear
          </button>
        </div>
      </div>
      {attachment && (
        <>
          <div className="w-full mt-2 text-center">
            <img
              class="inline"
              src={attachment}
              width="50px"
              height="50px"
              alt="/"
            />
          </div>
        </>
      )}
      <div
        className="w-full py-1 my-2 rounded-2xl bg-blue-400  text-center text-white font-semibold"
        onClick={onSubmit}
      >
        Jweet
        {/* <input
          className="text-white font-semibold"
          type="submit"
          value="Jweet"
        /> */}
      </div>
    </form>
  );
};
export default JweetFactoty;
