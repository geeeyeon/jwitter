import { authService } from "fBase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";

const Auth = () => {
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
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      let credential;
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(authService, provider);
        credential = GoogleAuthProvider.credentialFromResult(result);
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(authService, provider);
        credential = GithubAuthProvider.credentialFromResult(result);
      }
      console.log(credential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Coutinue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Coutinue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
