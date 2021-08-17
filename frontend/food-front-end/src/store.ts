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

type Store = {
  users: User[];
  fetchUsers: () => void;
  fetchUserById: () => void;
  createUser: (data: User) => void;
  updateUser: (data: User) => void;
  deleteUser: () => void;
};

const useStore = create<Store>((set, get) => ({
  users: [],

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
}));

export default useStore;
