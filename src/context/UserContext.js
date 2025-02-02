import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext({
  user: {
    id: 1,
    name: "Anonymous",
    email: "anonymous@anonymous",
    avatar: "",
  },
  updateUser: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    if (user && !user.name) {
      user.name = "Anonymous";
    }
    setUser(user);
  };

  const login = (email, password) => {
    if (user && !user.name) {
      user.name = "Anonymous";
    }
    setUser({ id: 1, name: "Anonymous", email, avatar: "" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
