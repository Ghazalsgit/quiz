import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/answer-button/header";
import "./sign-in.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/start-page");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(JSON.stringify(errorMessage));
      });
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="sign-in">
      <Header />
      <form className="form">
        <label className="input-field">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input-field">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="button" type="button" onClick={signIn}>
          Sign In
        </button>
        <h3>New here?</h3>
        <button type="button" onClick={navigateToSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
