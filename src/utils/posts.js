import { setPosts, addPost } from "../redux/reducers/postsSlice";
import {
  savePost,
  getPosts,
  uploadImage,
  createPostComment,
  getSinglePost,
} from "./firestore";
export const fetchPosts = async (dispatch) => {
  const posts = await getPosts();
  dispatch(setPosts(posts));
};

export const createPost = async (post, dispatch) => {
  try {
    console.log("Starting post creation with data:", {
      ...post,
      image: post.image ? "URI present" : "URI missing",
    });

    // Validate input
    if (!post.image) {
      throw new Error("Post image is required");
    }
    if (!post.userId) {
      throw new Error("User ID is required");
    }
    if (!post.name) {
      throw new Error("Post name is required");
    }

    // Convert image URI to blob
    console.log("Converting image to blob...");
    const response = await fetch(post.image);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const image = await response.blob();
    console.log("Image blob created:", {
      size: image.size,
      type: image.type,
    });

    // Upload image to storage
    // console.log("Uploading image...");
    // const imageUrl = await uploadImage(post.userId, image, post.name);
    // console.log("Image uploaded successfully:", imageUrl);

    // Prepare post data
    const postData = {
      ...post,
      //   image: imageUrl,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    // Save post to Firestore
    console.log("Saving post to Firestore...");
    const postId = await savePost(postData);
    console.log("Post saved with ID:", postId);

    // Fetch the saved post
    console.log("Fetching saved post...");
    const savedPost = await getPost(postId);
    console.log("Successfully fetched saved post");

    // Dispatch to Redux
    dispatch(addPost(savedPost));
    return savedPost;
  } catch (error) {
    console.error("Error in createPost:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      // Firebase specific error details
      serverResponse: error?.serverResponse,
      customData: error?.customData,
    });
    throw error;
  }
};

export const getPost = async (id) => {
  return await getSinglePost(id);
};
export const addPostComment = async (post, comment) => {
  comment.timestamp = new Date().toISOString();
  comment.id = comment.userId + "_" + Date.now().toString();
  await createPostComment(post.id, comment);
  return await getPost(post.id);
};
