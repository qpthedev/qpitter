import React, { useState } from "react";

const Home = () => {
  const [qweet, setQweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
};

export default Home;
