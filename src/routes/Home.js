import Qweet from "components/Qweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [qweet, setQweet] = useState("");
  const [qweets, setQweets] = useState([]);

  useEffect(() => {
    dbService.collection("qweets").onSnapshot((snapshot) => {
      const qweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQweets(qweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("qweets").add({
      text: qweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setQweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setQweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={qweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="QWEET" />
      </form>
      <div>
        {qweets.map((qweet) => (
          <Qweet
            key={qweet.id}
            qweetObj={qweet}
            isOwner={qweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
