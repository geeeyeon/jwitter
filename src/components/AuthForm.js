import { authService } from "fBase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const AuthForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const maxLen = (value) => value.length < 10;
  const email = useInput("");
  const password = useInput("", maxLen);
  const [error, setError] = useState("");

  // const onChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   if (name === "email") setEmail(value);
  //   else if (name === "password") setPassword(value);
  // };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        authService,
        email.value,
        password.value
      );
    } catch (err) {
      setError(err.message);
    }
  };
  const Login = async () => {
    try {
      await signInWithEmailAndPassword(
        authService,
        email.value,
        password.value
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="LoginForm">
        <form onSubmit={onSubmit}>
          <div className="text-center h-8 max-w-md mx-auto border-black border-b">
            <input
              className="w-full h-full border-transparent text-center"
              // name="email"
              // type="text"
              placeholder="Email"
              {...email}
              // required
              // value={email}
              // onChange={onChange}
            />
          </div>
          <div className="text-center h-8 max-w-md mx-auto border-black border-b mt-2">
            <input
              className="w-full h-full border-transparent text-center"
              // name="password"
              type="password"
              placeholder="Password"
              {...password}
              // required
              // value={password}
              // onChange={onChange}
            />
          </div>
          <div
            className="text-center mt-4 max-w-md mx-auto bg-blue-400 rounded-3xl py-1 text-white"
            onClick={Login}
          >
            로그인
            {/* <input
            className="text-white border-transparent"
            type="submit"
            value={newAccount ? "가입하기" : "로그인"}
          /> */}
          </div>
          <div className="text-sm text-red-700 text-center">{error}</div>
        </form>
        <div
          className="text-center my-4 max-w-md mx-auto border-gray-400 border rounded-3xl py-1"
          onClick={onSubmit}
        >
          이메일로 가입하고 시작하기
          {/* <span className="" onClick={toggleAccount}>
          {newAccount ? "로그인" : "이메일로 가입하기"}
        </span> */}
        </div>
      </div>
    </>
  );
};
export default AuthForm;
