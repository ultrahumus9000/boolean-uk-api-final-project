import React, { SyntheticEvent } from "react";
import useStore from "../store";

type IdProps = {
  postId: number;
};
function CommentForm({ postId }: IdProps) {
  //   const activeUser = useStore((store) => store.activeUser);
  const createComment = useStore((store) => store.createComment);

  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;

    const newComment = {
      content: targetEvent.comment.value,
      userId: savedInfo.id,
      postId: postId,
    };

    console.log(newComment);
    createComment(newComment);
    targetEvent.reset();
  }

  console.log("line 29", savedInfo.id);
  //   type newCommentForm = {
  //     content: string;
  //     userId: number;
  //     postId: number;
  //   };
  return (
    <form className="comment_form" onSubmit={handleSubmit}>
      <label className="comment-label">
        <span>Comment: </span>
        <input className="comment-text" type="text" name="comment" />
      </label>
      <input className="comment-submit" type="submit" value="Submit" />
    </form>
  );
}

export default CommentForm;
