import { authService } from "fBase";
import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
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
      <AuthForm />

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
