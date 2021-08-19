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
        <p>{post.likes}</p>
        <div className="likes">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 534 526"
            fill="#990000"
            width="30px"
          >
            <g id="HeartOutline">
              <title>Heart Outline, by Adam Stanislav</title>
              <desc>Hand-drawn on a Wacom tablet</desc>

              <path d="m417.221 3.47c-56.509 0.0527-105.7 35.891-139.78 77.469-13.191 16.094-39.574 48.283-39.574 48.283-0.22075-6.9693-0.65655-14.571-2-19.363-13.99-49.92-67-86.04-118.69-82.8-38.484 2.4-79.87 19.95-101.08 53.2-23.894 37.46-10.563 85.62 7.609 123.02 34.091 70.179 96.408 119.46 142.6 180.72 28.401 37.662 37.761 84.718 52.678 128.44-0.82385 12.896 10.965 13.298 6.5 2.0703-1.5325-21.48 6.0708-42.802 12.807-63.047 15.416-46.332 44.051-87.495 81.812-118.5 53.661-44.058 121.05-69.379 168.51-121.26 36.683-40.108 57.984-103.94 27.879-152.12-22.572-36.125-63.911-56.144-99.268-56.111z" />
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