import React, { SyntheticEvent } from "react";

function CommentForm() {
  function handleSubmit() {}

  return (
    <form className="comment_form">
      <label>
        Comment:
        <input className="comment-text" type="text" name="comment" />
      </label>
      <input className="comment-submit" type="submit" value="Submit" />
    </form>
  );
}

export default CommentForm;
