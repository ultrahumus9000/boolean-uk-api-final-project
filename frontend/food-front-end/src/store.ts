import create from "zustand";
import Posts from "./pages/posts";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

type Store = {
  users: User[];
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
  createUser: () => {
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
  updateUser: () => {
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
