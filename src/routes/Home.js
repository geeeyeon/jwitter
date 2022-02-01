import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Jweet from "components/Jweet";
import JweetFactoty from "components/JweetFactory";

const Home = ({ userObj }) => {
  const [jweets, setJweets] = useState([]);

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

  return (
    <>
      <div className="px-4 py-4">
        <JweetFactoty userObj={userObj} />
        <div className="pt-4 border-gray-300 border-b">
          {jweets.map((jweet) => (
            <Jweet
              key={jweet.id}
              jweetObj={jweet}
              isOwner={jweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
