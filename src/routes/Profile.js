import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName);
  const [userPhoto, setUserPhoto] = useState(userObj.userPhoto);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
    // navigate("/");
  };
  const getMyJweets = async () => {
    const q = query(
      collection(dbService, "jweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    // console.log("getMyJweets!!", q, querySnapshot);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "-->", doc.data());
    });
  };
  useEffect(() => {
    getMyJweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };
  return (
    <div className="px-4">
      <div className="my-2 font-bold text-lg">프로필 업데이트</div>
      <div className="flex mb-3 justify-center">
        {userPhoto ? (
          <img
            src={userObj.userPhoto}
            className="h-50 w-50 rounded-full object-none object-center"
            alt="/"
          />
        ) : (
          <img
            src={require("assets/userNoPhoto.png")}
            className="h-50 w-50 rounded-full object-none object-center"
            alt="/"
          />
        )}
      </div>
      <form onSubmit={onSubmit}>
        <input
          className="bg-gray-200 rounded-sm px-2 py-1 mr-1"
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName ? newDisplayName : ""}
        />
        <input
          className="bg-blue-400 px-2 py-1 rounded-2xl text-white"
          type="submit"
          value="Update"
        />
      </form>
      <div className="mt-5 mb-1 font-bold text-lg">로그아웃</div>
      <button
        className="bg-gray-600 px-2 py-1 text-white rounded-md"
        onClick={onLogOutClick}
      >
        Log Out
      </button>
    </div>
  );
};
export default Profile;
