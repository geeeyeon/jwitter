import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <>
      <div className="px-2 py-2 w-full">
        <div className="flex-row columns-2">
          <div>
            <Link to="/">
              <img
                src={require("assets/twitter.png")}
                width={50}
                height={50}
                alt="/"
              />
            </Link>
          </div>
          <Link
            className="flex justify-end text-blue-400 font-semibold"
            to="/profile"
          >
            {userObj?.displayName
              ? `${userObj?.displayName}님의 프로필`
              : `사용자님의 프로필`}
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
