import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/answer-button/header";
import "./sign-up.scss";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/pick-username");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(JSON.stringify(errorMessage));
      });
  };
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="sign-in">
      <div className="back-button" onClick={navigateBack}>
        <p>Back</p>
      </div>

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

        <button className="button" type="button" onClick={signUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
