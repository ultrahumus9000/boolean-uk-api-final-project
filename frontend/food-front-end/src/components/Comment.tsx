import React, { SyntheticEvent } from "react";
import useStore, { SingleComment } from "../store";
type CommentProp = {
  comment: SingleComment;
};

function Comment({ comment }: CommentProp) {
  const users = useStore((store) => store.users);

  const commentUserInfo = users.find((user) => {
    return user.id === comment.userId;
  });

  return (
    <article className="comment">
      <p className="comment_content">{comment.content}</p>
      <img
        className="post_avatar"
        src={commentUserInfo?.avatar}
        alt="username"
      ></img>
      <p className="username">{commentUserInfo?.username}</p>
    </article>
  );
}

export default Comment;
