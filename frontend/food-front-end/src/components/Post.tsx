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
  display: boolean;
  handleDisplay: () => void;
};

type Comments = SingleComment[];

function Post({ post, users, display, handleDisplay }: PostProps) {
  const comments = useStore((store) => store.comments);

  const fetchComments = useStore((store) => store.fetchComments);
  const postUser = users.find((user) => user?.id === post.userId);

  useEffect(() => {
    fetchComments();
  }, [comments.length]);

  let matchedComments: Comments = [];

  if (comments.length !== 0) {
    matchedComments = comments.filter((comment) => comment.postId === post.id);
  }

  return (
    <article className={`${display ? "post" : "non-back"}`}>
      {display ? <UserForPost postUser={postUser} /> : null}
      <img
        className="post_picture"
        src={post.picture}
        alt="foopicture"
        onClick={handleDisplay}
      ></img>
      {display ? (
        <>
          <div className="post_info">
            <p>
              <svg
                width="35px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <title>BUSINESS</title>
                <g id="_23.SPEAK" data-name="23.SPEAK">
                  <polygon points="8.4 11.79 8.4 16.14 8.4 19.08 9 19.08 11.15 19.08 11.87 19.08 11.87 11.03 8.4 11.03 8.4 11.79" />
                  <polygon points="9.9 20.46 11.07 24.84 11.75 24.67 10.62 20.46 9.9 20.46" />
                  <rect x="5.63" y="12.48" width="1.39" height="2.97" />
                  <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm6.6,9.55,4.21-1.66a.69.69,0,0,1,.51,1.29l-4.21,1.66a.69.69,0,0,1-.51-1.29Zm5.15,3.13a.69.69,0,0,1-.69.69H23.69a.69.69,0,1,1,0-1.38h3.37A.69.69,0,0,1,27.75,14.67Zm-6.49,4.6a.69.69,0,0,1-.69.69h-.13l-7.18-1.42v1.24a.69.69,0,0,1-.69.69H12L13.27,25a.69.69,0,0,1-.5.85l-2,.51-.17,0a.69.69,0,0,1-.67-.51L8.47,20.46H7.71A.69.69,0,0,1,7,19.77V16.84H4.94a.69.69,0,0,1-.69-.69V11.79a.69.69,0,0,1,.69-.69H7v-.76a.69.69,0,0,1,.69-.69h4.85a.69.69,0,0,1,.69.69v1.24l7.18-1.42a.69.69,0,0,1,.82.68Zm6.44-.2a.69.69,0,0,1-.9.39L22.6,17.8a.69.69,0,0,1,.51-1.29l4.21,1.66A.69.69,0,0,1,27.7,19.07Z" />
                  <polygon points="13.25 17.12 19.88 18.43 19.88 11.68 13.25 12.99 13.25 17.12" />
                </g>
              </svg>
              <span>{post.text_content}</span>{" "}
            </p>
            {post.address ? (
              <p className="address-p">
                <svg
                  width="35px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 60 60"
                >
                  <defs>
                    <style>
                      {
                        ".prefix__cls-2{fill:none;stroke:#6b400d;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
                      }
                    </style>
                  </defs>
                  <title>{"Location"}</title>
                  <g id="prefix__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
                    <g id="prefix__Icons">
                      <g id="prefix__Location">
                        <path fill="none" d="M0 0h60v60H0z" />
                        <path
                          className="prefix__cls-2"
                          d="M30 46.67S17.5 32.74 17.5 25.83a12.5 12.5 0 0125 0c0 3.43-3.08 8.6-6.19 12.92"
                        />
                        <path
                          fill="#f2f0e7"
                          stroke="#6b400d"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M22.8 46.67h14.4"
                        />
                        <path
                          d="M30 17.5a8.34 8.34 0 108.33 8.33A8.33 8.33 0 0030 17.5zm0 12.18a3.85 3.85 0 113.85-3.85A3.85 3.85 0 0130 29.68z"
                          fill="#ffc824"
                        />
                        <path
                          className="prefix__cls-2"
                          d="M30 22a3.85 3.85 0 11-3.85 3.84"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>{post.address}</span>{" "}
              </p>
            ) : null}

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
          </div>{" "}
        </>
      ) : null}
    </article>
  );
}

export default Post;
