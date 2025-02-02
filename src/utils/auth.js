import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import { addUser, getUser } from "./firestore";
export const registerDB = async ({ name, email, password }) => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credentials.user;
  if (!user || !user.uid) {
    throw new Error("User not registered");
    return;
  }
  await addUser(user.uid, {
    uid: user.uid,
    email: email || "",
    displayName: name || "",
  });
  if (name) {
    await updateProfile(user, {
      displayName: name || "",
    });
  }
};
export const loginDB = async ({ email, password }, dispatch) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  const user = credentials.user;
  if (!user) {
    throw new Error("User not found");
    return;
  }
  const userData = await getUser(user.uid);
  if (!userData) {
    throw new Error("User data not found");
    return;
  }
  dispatch(
    setUserInfo({
      ...userData,
      uid: user.uid,
    })
  );
};
// Функція для логауту
export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
// Відстеження змін у стані аутентифікації
export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid);
      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};
// Оновлення профілю користувача
export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
