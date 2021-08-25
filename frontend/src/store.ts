import React from "react";
import { NavLinkProps } from "react-router-dom";
import create from "zustand";

function calculateTagLength(tagsFromServer: Tag[]) {
  const tagLengthArray = tagsFromServer.map((tag: Tag) => {
    const result = tag.tags.length;
    return result;
  });

  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  const tagLength = tagLengthArray.reduce(reducer);
  return tagLength;
}

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

// model PostToTag {
//   id     Int  @id @default(autoincrement())
//   post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
//   postId Int
//   tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
//   tagId  Int

//   @@unique([postId, tagId])
// }

// model Tag {
//   id         Int         @id @default(autoincrement())
//   type       String
//   postToTags PostToTag[]
// }

export type NewTagForm = {
  postId: number;
  type: string;
};

export type Tag = {
  postId: number;
  tags: String[];
};
// "postId": 3,
// "tags": []

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
  tags: Tag[];
  tagLength: number;
  display: boolean;
  click: boolean;
  tick: boolean;
  search: string;
  setSearch: (arg: string) => void;
  userPosts: SinglePost[];
  toggleDisplay: () => void;
  toggleClick: () => void;
  toggleTick: () => void;
  setFalse: () => void;
  setActiveUser: (arg: number) => void;
  fetchUsers: () => void;
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
  fetchTags: () => void;
  creatTag: (data: NewTagForm) => void;
  deleteTag: (id: number) => void;
  fectchPostByUserId: (id: number) => void;
};

const useStore = create<Store>((set, get) => ({
  users: [],
  posts: [],
  comments: [],
  activeUser: 0,
  tags: [],
  tagLength: 0,
  display: false,
  click: true,
  tick: false,
  userPosts: [],
  search: "",
  setSearch: (search) => {
    set({ search });
  },

  toggleDisplay: () => {
    set({ display: !get().display });
  },
  toggleClick: () => {
    set({ click: !get().click });
  },
  toggleTick: () => {
    set({ tick: !get().tick });
  },
  setFalse: () => {
    set({ tick: false });
  },
  setActiveUser: (userId) => set({ activeUser: userId }),

  fetchUsers: () => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then((users) => set({ users: users }));
  },

  createUser: (data) => {
    fetch("http://localhost:4000/users", {
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
    const id = Number(data?.id);
    fetch(`http://localhost:4000/users/${id}`, {
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
    id = Number(id);
    return fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updateUsers = get().users.filter((user) => user?.id !== id);
        set({ users: updateUsers });

        const updatedPosts = get().posts.filter((post) => post.userId !== id);
        set({ posts: updatedPosts });

        const updatedComments = get().comments.filter(
          (comment) => comment.userId !== id
        );
        set({ comments: updatedComments });
      })
      .then(() => {
        localStorage.clear();
      });
  },

  fetchPosts: () => {
    fetch("http://localhost:4000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => set({ posts: postsFromServer }));
  },

  createPost: (data) => {
    fetch("http://localhost:4000/posts", {
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
    console.log("update post", data);
    fetch(`http://localhost:4000/posts/${id}`, {
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
    id = Number(id);
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("deleted!!!");
      const updatedPosts = get().posts.filter((post) => post.id !== id);
      console.log(updatedPosts);
      set({ posts: updatedPosts });
    });
  },
  fetchComments: () => {
    fetch("http://localhost:4000/comments")
      .then((resp) => resp.json())
      .then((commentsFromServer) => set({ comments: commentsFromServer }));
  },
  createComment: (data) => {
    fetch("http://localhost:4000/comments", {
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
    fetch(`http://localhost:4000/comments/${id}`, {
      method: "DELETE",
    }).then(() => {});
  },
  fetchTags: () => {
    fetch(`http://localhost:4000/tags/`)
      .then((resp) => resp.json())
      .then((tagsFromServer) => {
        set({ tags: tagsFromServer });
        const newTagLength = calculateTagLength(tagsFromServer);
        set({ tagLength: newTagLength });
      });
  },
  creatTag: (data: NewTagForm) => {
    fetch("http://localhost:4000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())

      .then((newTagFromServer) => {
        set({ tagLength: get().tagLength + 1 });
      });
  },
  deleteTag: (id: number) => {
    return;
  },
  fectchPostByUserId: (id: number) => {
    fetch(`http://localhost:4000/users/${id}`)
      .then((resp) => resp.json())
      .then((posts) => {
        if (typeof posts === "string") {
          return;
        } else {
          set({ userPosts: posts });
        }
      });
  },
}));

export default useStore;

// async function createOnetag(req, res) {
//   const { type, postId } = req.body;
//   try {
//     const tags = await tag.findMany();

//     const tagtypes = tags.map((tagInfo) => tagInfo.type);

//     if (tagtypes.includes(type)) {
//       const findTag = tags.find((tagInfo) => tagInfo.type === type);

//       const newTag = await postToTag.create({
//         data: {
//           postId,
//           tagId: findTag.id,
//         },
//         // id     Int  @id @default(autoincrement())
//         // post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
//         // postId Int
//         // tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
//         // tagId  Int
//       });

//       const tagResult = await tag.findUnique({
//         where: {
//           id: newTag.tagId,
//         },
//       });

//       res.json(tagResult.type);
//     } else {
//       const tagInfo = await tag.create({
//         data: {
//           type,
//         },
//       });

//       const newTagToPost = await postToTag.create({
//         data: {
//           postId,
//           tagId: tagInfo.id,
//         },
//       });

//       // res.json(newTagToPost);
//       res.json(tagInfo.type);
//     }
//   } catch (error) {
//     console.log(error);
//     res.json(errorHandler(error));
//   }
// }
