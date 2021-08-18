import React, { SyntheticEvent } from "react";
import useStore from "../store";

type IdProps = {
  postId: number;
};
function CommentForm({ postId }: IdProps) {
  const activeUser = useStore((store) => store.activeUser);
  const createComment = useStore((store) => store.createComment);

  function handleSubmit(event: SyntheticEvent) {
    const targetEvent = event.target as HTMLFormElement;

    const newComment = {
      content: targetEvent.comment_text.value,
      userId: activeUser,
      postId: postId,
    };

    createComment(newComment);
    targetEvent.reset();
  }

  //   type newCommentForm = {
  //     content: string;
  //     userId: number;
  //     postId: number;
  //   };
  return (
    <form className="comment_form" onSubmit={handleSubmit}>
      <label>
        Comment:
        <input className="comment-text" type="text" name="comment" />
      </label>
      <input className="comment-submit" type="submit" value="Submit" />
    </form>
  );
}

export default CommentForm;
