import React, { createContext, useState, useContext } from "react";

export const PostsContext = createContext({
  lastId: 0,
  posts: [],
  createPost: (post) => {},
});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);

  const createPost = (post) => {
    post.id = lastId + 1;
    console.log(post);
    setPosts([...posts, post]);
    setLastId(lastId + 1);
  };

  return (
    <PostsContext.Provider value={{ posts, createPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within an PostsProvider");
  }
  return context;
};