import React from "react";
import { useEffect } from "react";
import useStore, { SinglePost } from "../store";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { SingleComment, User } from "../store";
import UserForPost from "./UserForPost";
type PostProps = {
  post: SinglePost;
  users: User[];
};

type Comments = SingleComment[];

function Post({ post, users }: PostProps) {
  const comments = useStore((store) => store.comments);
  const fetchComments = useStore((store) => store.fetchComments);

  const postUser = users.find((user) => user?.id === post.userId);
  //   console.log(postUser);
  useEffect(() => {
    fetchComments();
  }, [comments.length]);

  let matchedComments: Comments = [];

  if (comments.length !== 0) {
    matchedComments = comments.filter((comment) => comment.postId === post.id);
  }

  return (
    <article className="post">
      <UserForPost postUser={postUser} />
      <img
        className="post_picture"
        src={post.picture}
        alt="foopicture"
        // onClick={}
      ></img>
      <div className="post_info">
        <p>{post.text_content}</p>
        <p>{post.address}</p>
        <div className="likes">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
            <title>{"carrot"}</title>
            <g data-name="carrot">
              <path
                d="M86.76 3.24a2.54 2.54 0 00-3.59 0l-19.7 19.69 7.8-14a2.59 2.59 0 00-.89-3.46 2.39 2.39 0 00-3.38.91L50.62 35.9a2.55 2.55 0 00-.28 1.46 2.21 2.21 0 00.27 1.22 2.37 2.37 0 001.81 1.1A2.61 2.61 0 0054 39.4l29.58-16.52a2.38 2.38 0 001-3.28 2.53 2.53 0 00-3.42-.82l-14.39 8 20-20a2.53 2.53 0 000-3.59m-27.91 28l.18-.33a1.11 1.11 0 00.16.1z"
                fill="#82c60a"
              />
              <path
                d="M70.24 31l-5.62-5.63L59 19.76c-3.75-3.75-7.65-7.36-16.89 1.88-3.95 3.92-37.55 52.54-37.55 52.54s-4.63 6.63 0 11.26 11.26 0 11.26 0 48.62-33.6 52.55-37.53C77.61 38.67 74 34.77 70.24 31"
                fill="#ff860d"
              />
              <path
                d="M25.45 45.75a2.33 2.33 0 00-.71-.47l-2.87 4.06 5.5 5.51A2.54 2.54 0 1031 51.27zm-2.66 18.6a2.54 2.54 0 00-3.58 3.59l2.85 2.86a2.54 2.54 0 103.58-3.59zm23-10.63a2.54 2.54 0 000 3.59L50 61.53l4.19-3-4.81-4.82a2.53 2.53 0 00-3.58 0M70.81 38L60 27.15a2.54 2.54 0 10-3.58 3.59l10.81 10.83A2.53 2.53 0 1070.81 38m-21.25 3.57a2.53 2.53 0 000-3.59L38.74 27.16a2.35 2.35 0 00-.66-.44c-.88 1.18-1.87 2.53-2.94 4L46 41.57a2.53 2.53 0 003.59 0"
                fill="#e56107"
              />
            </g>
          </svg>

          <p>
            <span>{post.likes}</span> likes
          </p>
        </div>
        <div className="tags">
          <span className="tag">American</span>
        </div>
      </div>
      <CommentForm postId={post.id} />
      <div className="comments">
        {matchedComments.map((comment) => {
          return <Comment comment={comment} />;
        })}
      </div>
    </article>
  );
}

export default Post;
