import create from "zustand";

type newUserFrom = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  avatar: string;
  email: string;
};

export type User =
  | {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      password: string;
      avatar: string;
      email: string;
    }
  | undefined;

export type SingleComment = {
  id: number;
  content: string;
  userId: number;
  postId: number;
};

export type newCommentForm = {
  content: string;
  userId: number;
  postId: number;
};

type PostToTag = {
  id: number;
  tagId: number;
  postId: number;
};

export type SinglePost = {
  id: number;
  date: string;
  text_content: string;
  picture: string;
  likes: number;
  address: string | null;
  userId: number;
};

type newPostForm = {
  date: string;
  text_content: string;
  picture: string;
  likes: number;
  address: string | null;
  userId: number;
};
type updatePost = {
  id: number;
  likes: number;
};

// id             Int         @id @default(autoincrement())
// date           DateTime    @db.Date
// text_content   String      @default("")
// picture        String
// likes          Int         @default(0)
// address        String?     @db.VarChar(50)
// user           User        @relation(fields: [userId], references: [id], onDelete: Cascade)
// userId         Int
// comments       Comment[]
// posttotags     PostToTag[]
// usersInArchive Archive[]

type Store = {
  users: User[];
  posts: SinglePost[];
  comments: SingleComment[];
  activeUser: number;
  setActiveUser: (arg: number) => void;
  fetchUsers: () => void;
  // fetchUserById: (id: Number) => void;
  createUser: (data: newUserFrom) => void;
  updateUser: (data: User) => void;
  deleteUser: (id: number) => void;
  fetchPosts: () => void;
  createPost: (data: newPostForm) => void;
  updatePost: (data: updatePost) => void;
  deletePost: (id: number) => void;
  fetchComments: () => void;
  createComment: (arg: newCommentForm) => void;
  deleteComment: (id: number) => void;
};

const useStore = create<Store>((set, get) => ({
  users: [],
  // user: {},
  posts: [],
  comments: [],
  activeUser: 0,
  setActiveUser: (userId) => set({ activeUser: userId }),

  fetchUsers: () => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((users) => set({ users: users }));
  },

  // fetchUserById: () => {
  //   fetch("http://localhost:3000/users/activeUser")
  //     .then((resp) => resp.json())
  //     .then((user) => set({ user: user }));
  // },

  createUser: (data) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((newUser) => set({ users: [...get().users, newUser] }));
  },
  updateUser: (data) => {
    const id = data?.id;
    fetch("http://localhost:3000/users/id", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let updatedUsers = get().users.map((user) => {
          if (user?.id === id) {
            return data;
          }
          return user;
        });
        set({ users: updatedUsers });
      });
  },
  deleteUser: (id) => {
    fetch("http://localhost:3000/users/id", {
      method: "DELETE",
    });
  },

  fetchPosts: () => {
    fetch("http://localhost:3000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => set({ posts: postsFromServer }));
  },

  createPost: (data) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())

      .then((newPostFromSever) =>
        set({ posts: [...get().posts, newPostFromSever] })
      );
  },
  updatePost: (data) => {
    const id = data.id;
    fetch("http://localhost:3000/posts/id", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let updatedPosts = get().posts.map((post) => {
          if (post.id === id) {
            return data;
          }
          return post;
        });
        set({ posts: updatedPosts });
      });
  },
  deletePost: (id) => {
    fetch("http://localhost:3000/posts/id", {
      method: "DELETE",
    });
  },
  fetchComments: () => {
    fetch("http://localhost:3000/comments")
      .then((resp) => resp.json())
      .then((commentsFromServer) => set({ comments: commentsFromServer }));
  },
  createComment: (data) => {
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())

      .then((newCommentFromSever) =>
        set({ comments: [...get().comments, newCommentFromSever] })
      );
  },
  deleteComment: (id) => {
    fetch("http://localhost:3000/comments/id", {
      method: "DELETE",
    });
  },
}));

export default useStore;
