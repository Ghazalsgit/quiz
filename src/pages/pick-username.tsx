import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/answer-button/header";
import "./pick-username.scss";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

function PickUsername() {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const updateUsername = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      updateProfile(currentUser, {
        displayName: username,
      })
        .then(() => {
          saveUser(currentUser);
        })
        .catch((error) => {});
    }
  };

  const saveUser = async (currentUser: any) => {
    const displayName: string = currentUser.displayName;
    const userUID: string = currentUser.uid;

    const db = getFirestore();

    try {
      const userDocRef = doc(collection(db, "users"), userUID);

      await setDoc(userDocRef, {
        displayName,
        uid: userUID,
        score: 0,
        createdQuizIds: [],
      });

      console.log("Document written with ID: ", userDocRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    navigate("/start-page");
  };

  return (
    <div className="pick-username">
      <Header />
      <h2>Pick a username</h2>
      <p>
        Choose a memorable username! It will be proudly displayed in the score
        table.
      </p>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="BästaKolleganPåHelo"
      />
      <button className="button" onClick={updateUsername}>
        Get started
      </button>
    </div>
  );
}

export default PickUsername;
