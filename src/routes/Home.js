import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { dbService } from "fBase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);

  const getJweets = async () => {
    const qry = query(collection(dbService, "jweets"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      const jweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setJweets((prev) => [jweetObj, ...prev]);
    });
  };

  useEffect(() => {
    // getJweets();
    //실시간 데이터베이스 업데이트 - onSnapshot
    onSnapshot(
      query(collection(dbService, "jweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJweets(jweetArray);
      }
    );
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweets"), {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setJweet("");
    } catch (err) {
      console.log("firestore error", err);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={jweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Jweet" />
      </form>
      <div>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
