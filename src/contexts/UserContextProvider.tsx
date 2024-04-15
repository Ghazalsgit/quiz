import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "../interfaces";
import React from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

export const UserContext = React.createContext<User[] | null>(null);
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const fetchData = async () => {
    try {
      const db = getFirestore(app);
      const newUserData: User[] = [];
      const usersCollection = collection(db, "users");
      const users = await getDocs(usersCollection);

      users.docs.forEach((user) => {
        const data = user.data() as User;

        newUserData.push(data);
      });

      // Sort users based on their scores in descending order
      newUserData.sort((a, b) => b.score - a.score);

      setAllUsers(newUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [allUsers, setAllUsers] = useState<User[]>([]);

  return (
    <UserContext.Provider value={allUsers}> {children} </UserContext.Provider>
  );
};
