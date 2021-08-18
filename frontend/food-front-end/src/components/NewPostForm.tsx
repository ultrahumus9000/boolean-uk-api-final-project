import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import "../styles/new_post_form.css";

function NewPostForm() {
  const createPost = useStore((store) => store.createPost);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;

    let newPost = {
      picture: targetEvent.picture.value,
      text_content: targetEvent.text_content.value,
      address: targetEvent.address.value,
    };
    createPost(newPost);
    targetEvent.reset();
  }

  return (
    <form className="post_form" onSubmit={handleSubmit}>
      <h3>Create new post:</h3>
      <label>
        Photo:
        <input type="text" name="picture" required />
      </label>
      <label>
        Text:
        <input type="text" name="text_content" required />
      </label>
      <label>
        Address:
        <input type="text" name="address" required />
      </label>

      <Link to="/posts">
        <input className="post_submit" type="submit" value="Submit" required />
      </Link>
    </form>
  );
}

export default NewPostForm;
