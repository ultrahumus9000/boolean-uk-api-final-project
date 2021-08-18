import create from "zustand";

type newUserFrom = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  avatar: string;
  email: string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  avatar: string;
  email: string;
};

type Comment = {
  id: number;
  content: string;
  userId: number;
  postId: number;
};

// type PostToTag = {
//   id: number;
//   tagId: number;
//   postId: number;
// };

type Post = {
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
  posts: Post[];
  activeUser: number;
  setActiveUser: (arg: number) => void;
  fetchUsers: () => void;

  // fetchUserById: (id: number) => void;
  createUser: (data: newUserFrom) => void;
  updateUser: (data: User) => void;
  deleteUser: (id: number) => void;
  fetchPosts: () => void;
  createPost: (arg: newPostForm) => void;
  deletePost: (id: number) => void;

};

const useStore = create<Store>((set, get) => ({
  users: [],
  posts: [],

  activeUser: 0,
  setActiveUser: (userId) => set({ activeUser: userId }),

  fetchUsers: () => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((users) => set({ users: users }));
  },

  // fetchUserById: (id) => {
  //   fetch("http://localhost:3000/users/id")
  //     .then((resp) => resp.json())
  //     .then((user) => set({ users: user }));
  // },

//   fetchUserByUsername: () => {
//     fetch("http://localhost:3000/users/username").then((resp) =>
//       resp.json().then((username) => console.log(username))
//     );
//   },

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
          if (user.id === data.id) {
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
  deletePost: (id) => {
    fetch("http://localhost:3000/posts/id", {
      method: "DELETE",
    });
  },
}));

export default useStore;
