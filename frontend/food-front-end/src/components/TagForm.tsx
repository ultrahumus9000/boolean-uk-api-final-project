import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";

type TagFormProps = {
  tick: boolean;
  setTick: (arg: boolean) => void;
  postId: number;
};

export default function TagForm({ tick, setTick, postId }: TagFormProps) {
  const [displayNewTagForm, setDisplayNewTagFrom] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tags/types")
      .then((resp) => resp.json())
      .then((tagsTypesFromServer) => {
        setTags(tagsTypesFromServer);
      });
  }, []);

  function toggleTick() {
    setTick(!tick);
  }

  function handleTagForm(e: SyntheticEvent) {
    e.preventDefault();

    setTick(false);
  }

  function toggleDisplay() {
    setDisplayNewTagFrom(!displayNewTagForm);
  }

  return (
    <>
      {displayNewTagForm ? null : (
        <form className="tag-form form" onSubmit={handleTagForm}>
          <label htmlFor=""> Choose A Tag Below </label>
          <div className="select-div">
            <select name="select">
              {tags.map((tag) => {
                return <option value={tag}>{tag}</option>;
              })}
            </select>
            <button type="submit">Submit</button>
          </div>
          <button className="display-more-tag-form-btn" onClick={toggleDisplay}>
            Not suitable tags? click here to add more
          </button>
          <button onClick={toggleTick}>Cancel add</button>
        </form>
      )}
      {displayNewTagForm ? (
        <form className="create-tag-form form">
          <label htmlFor="">Create new tag?</label>
          <input type="text" />
          <button>Confirm</button>
          <button onClick={toggleDisplay}>Cancel</button>
        </form>
      ) : null}
    </>
  );
}
