import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useStore from "../store";

type TagFormProps = {
  tick: boolean;
  setTick: (arg: boolean) => void;
  postId: number;
};

export default function TagForm({ tick, setTick, postId }: TagFormProps) {
  const [displayNewTagForm, setDisplayNewTagFrom] = useState(false);
  const [tags, setTags] = useState([]);
  const createTag = useStore((store) => store.creatTag);
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
    const targetEvent = e.target as HTMLFormElement;

    const newTag = {
      postId,
      type: targetEvent.select.value,
    };
    createTag(newTag);
    setTick(false);
  }

  function handleNewTagForm(e: SyntheticEvent) {
    e.preventDefault();
    const targetEvent = e.target as HTMLFormElement;

    const newTag = {
      postId,
      type: targetEvent.input.value,
    };
    createTag(newTag);
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
          <div className="checkboxs-div">
            {tags.map((tag) => {
              return (
                <>
                  <label className="checkbox-label">
                    <span>{tag}</span>
                    <input type="checkbox" value={tag} name={tag} />
                  </label>
                </>
              );
            })}

            <button type="submit">Submit</button>
          </div>
          <button className="display-more-tag-form-btn" onClick={toggleDisplay}>
            Not suitable tags? click here to add more
          </button>
          <button onClick={toggleTick}>Cancel add</button>
        </form>
      )}
      {displayNewTagForm ? (
        <form className="create-tag-form form" onSubmit={handleNewTagForm}>
          <label>Create new tag?</label>
          <input name="input" type="text" />
          <button type="submit">Confirm</button>
          <button onClick={toggleDisplay}>Cancel</button>
        </form>
      ) : null}
    </>
  );
}

// could have a check box version but need to design css again therefore i gave up but logic is provided in backend
