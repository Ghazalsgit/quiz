import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import "./score-list.scss";
import { emojis } from "../emojis";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function ScoreList() {
  const [loading, setLoading] = useState(true);
  const allUsers = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 1000; // Set the delay in milliseconds (1 second)

    // Set a timeout to update loading state after the delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);

    // Clear the timeout if the component is unmounted before the delay expires
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading || !allUsers) {
    return (
      <ClipLoader
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#fcc92d"
      />
    );
  }
  function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="scores-list">
      <div className="back-button" onClick={navigateBack}>
        <p>Back</p>
      </div>
      <h3>Score list</h3>
      <div>
        <ol>
          {allUsers.map((user) => (
            <li key={user.uid}>
              {getRandomEmoji()} - {user.displayName} - {user.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ScoreList;
