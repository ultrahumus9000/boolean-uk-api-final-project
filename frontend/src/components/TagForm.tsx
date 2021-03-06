import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useStore, { NewTagForm } from "../store";

type TagFormProps = {
  postId: number;
};

export default function TagForm({ postId }: TagFormProps) {
  const [displayNewTagForm, setDisplayNewTagFrom] = useState(false);
  const tick = useStore((store) => store.tick);
  const setTickFalse = useStore((store) => store.setFalse);
  const toggleTick = useStore((store) => store.toggleTick);
  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState<NewTagForm[]>([]);
  const createTag = useStore((store) => store.creatTag);
  useEffect(() => {
    fetch("http://localhost:4000/tags/types", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((tagsTypesFromServer) => {
        setTags(tagsTypesFromServer);
      });
  }, []);

  async function handleTagForm(e: SyntheticEvent) {
    e.preventDefault();
    const targetEvent = e.target as HTMLFormElement;
    for await (const newTag of newTags) {
      await createTag(newTag);
    }
    setTickFalse();
  }

  function handleNewTagForm(e: SyntheticEvent) {
    e.preventDefault();
    const targetEvent = e.target as HTMLFormElement;

    const newTag = {
      postId,
      type: targetEvent.input.value,
    };

    createTag(newTag);
    setTickFalse();
  }

  function toggleDisplay() {
    setDisplayNewTagFrom(!displayNewTagForm);
  }

  function checkBoxTick(e: SyntheticEvent) {
    const targetEvent = e.target as HTMLInputElement;

    if (targetEvent.checked) {
      const newTag = {
        postId,
        type: targetEvent.value,
      };
      setNewTags([...newTags, newTag]);
    } else {
      const filtedTags = newTags.filter(
        (tag) => tag.type !== targetEvent.value
      );
      setNewTags(filtedTags);
    }
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
                    <input
                      type="checkbox"
                      value={tag}
                      name={tag}
                      onClick={checkBoxTick}
                    />
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
