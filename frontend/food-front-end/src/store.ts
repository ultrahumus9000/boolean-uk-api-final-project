import create from "zustand";
import Posts from "./pages/posts";

type User = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  avatar: string;
  email: string;
};

type Post = {
  picture: string;
  text_content: string;
  address: string;
};

type Store = {
  users: User[];
  fetchUsers: () => void;
  fetchUserById: () => void;
  fetchUserByUsername: () => void;
  createUser: (data: User) => void;
  updateUser: (data: User) => void;
  deleteUser: () => void;
  createPost: (data: Post) => void;
};

const useStore = create<Store>((set, get) => ({
  users: [],
  posts: [],

  fetchUsers: () => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((users) => set({ users: users }));
  },
  fetchUserById: () => {
    fetch("http://localhost:3000/users/id")
      .then((resp) => resp.json())
      .then((user) => set({ users: user }));
  },
  fetchUserByUsername: () => {
    fetch("http://localhost:3000/users/username").then((resp) =>
      resp.json().then((username) => console.log(username))
    );
  },
  createUser: (data) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
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
      .then((data) => console.log(data));
  },
  deleteUser: () => {
    fetch("http://localhost:3000/users/id", {
      method: "DELETE",
    });
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
      .then((data) => console.log(data));
  },
}));

export default useStore;
