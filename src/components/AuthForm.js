import { authService } from "fBase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="text-center h-8 max-w-md mx-auto border-b">
          <input
            className="w-full h-full border-transparent text-center"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="text-center h-8 max-w-md mx-auto border-b mt-2">
          <input
            className="w-full h-full border-transparent text-center"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="text-center mt-4 max-w-md mx-auto border-gray-400 border rounded-3xl py-1">
          <input type="submit" value={newAccount ? "가입하기" : "로그인"} />
        </div>
        <div className="text-sm text-red-700 text-center">{error}</div>
      </form>
      <div className="text-center my-4 max-w-md mx-auto border-gray-400 border rounded-3xl py-1">
        <span className="" onClick={toggleAccount}>
          {newAccount ? "로그인" : "이메일로 가입하기"}
        </span>
      </div>
    </>
  );
};
export default AuthForm;
