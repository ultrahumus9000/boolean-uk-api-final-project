import React, { SyntheticEvent } from "react";
import { useState } from "react";
import useStore, { User } from "../store";

function NewPostForm() {
  const [addressStatus, setAddressStatus] = useState(false);

  function toggleAddress(event: SyntheticEvent) {
    event.preventDefault();
    setAddressStatus(!addressStatus);
  }

  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);

  const createPost = useStore((store) => store.createPost);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;
    let newAddress = "";
    if (addressStatus) {
      newAddress = targetEvent.address.value;
    } else {
      newAddress = "";
    }

    let newPost = {
      date: new Date().toISOString(),
      likes: 0,
      picture: targetEvent.picture.value,
      text_content: targetEvent.text_content.value,
      address: newAddress,
    };

    createPost(newPost);
    targetEvent.reset();
  }

  return (
    <form className="post_form" onSubmit={handleSubmit}>
      <h3 className="post_form_heading">Create new post:</h3>
      <label>
        Photo:
        <input type="text" name="picture" required />
      </label>
      <label>
        Text:
        <input type="text" name="text_content" required />
      </label>
      <button className="add-btn" onClick={toggleAddress}>
        {" "}
        add address{" "}
      </button>
      {addressStatus ? (
        <label>
          Address:
          <input type="text" name="address" />
        </label>
      ) : null}

      <input
        className="new_post_submit"
        type="submit"
        value="Submit"
        required
      />
    </form>
  );
}

export default NewPostForm;
