// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBq16G5C0F0f_DVheXBbNkbSUoD0bG5o8",
  authDomain: "goit-reactnative-hw.firebaseapp.com",
  projectId: "goit-reactnative-hw",
  storageBucket: "goit-reactnative-hw.firebasestorage.app",
  messagingSenderId: "542773473512",
  appId: "1:542773473512:web:ce3f916085f9fb90cf195d",
  measurementId: "G-KGB9J9GSP1",
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
