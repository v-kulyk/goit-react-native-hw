import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  arrayUnion,
  uuid,
} from "firebase/firestore";
import { db, storage } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Функція для додавання документа до колекції
export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
export const savePost = async (post) => {
  const docRef = await addDoc(collection(db, "posts"), post, {
    timestamp: serverTimestamp(),
  });
  console.log("Post added:", docRef.id);
  return docRef.id;
};
export const createPostComment = async (id, comment) => {
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      comments: arrayUnion(comment),
    });
    console.log("Comment added:", comment);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
export const getPosts = async () => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting posts:", error);
  }
  return [];
};
export const getSinglePost = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};
// Функція для отримання документа з колекції
export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log("User data updated to Firestore:", uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};
export const uploadImage = async (userId, file, fileName) => {
  const imageRef = ref(storage, `images/${userId}/${fileName}`);
  await uploadBytes(imageRef, file);
  return await getImageUrl(imageRef);
};
export const getImageUrl = async (imageRef) => {
  return await getDownloadURL(imageRef);
};
