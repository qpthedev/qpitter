import { dbService } from "fbase";
import React, { useState } from "react";

const Qweet = ({ qweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newQweet, setNewQweet] = useState(qweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Delete this qweet?");
    if (ok) {
      await dbService.doc(`qweets/${qweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`qweets/${qweetObj.id}`).update({
      text: newQweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewQweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newQweet} onChange={onChange} required />
            <input type="submit" value="Update Qweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{qweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Qweet;
