import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import LoginInput from "../components/LoginInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

export default function RegistrationScreen({ updateRegistered }) {
  const [form, setForm] = useReducer(
    (state, action) => {
      return { ...state, [action.type]: action.payload };
    },
    {
      login: "",
      email: "",
      password: "",
    }
  );
  const [errors, setErrors] = useState({
    login: "",
    email: "",
    password: "",
  });
  const errorsMessages = {
    login: "Введіть логін",
    email: "Введіть адресу електронної пошти",
    password: "Введіть пароль",
  };
  const validateForm = () => {
    const currentErrors = {
      login: "",
      email: "",
      password: "",
    };

    if (form.login === "") {
      currentErrors.login = errorsMessages.login;
    }

    if (form.email === "") {
      currentErrors.email = errorsMessages.email;
    }

    if (form.password === "") {
      currentErrors.password = errorsMessages.password;
    }

    setErrors(currentErrors);

    if (Object.values(currentErrors).every((error) => error === "")) {
      return true;
    }

    return false;
  };

  const handleLoginChange = (value) => {
    setForm({ type: "login", payload: value });
  };

  const handleEmailChange = (value) => {
    setForm({ type: "email", payload: value });
  };

  const handlePasswordChange = (value) => {
    setForm({ type: "password", payload: value });
  };

  const onLogin = async () => {
    updateRegistered(true);
  };

  const onRegister = () => {
    if (!validateForm()) {
      return;
    }
    console.log("register");
    console.log(form);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ImageBackground
            style={styles.container}
            source={require("../../assets/mountain-bg.jpg")}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Реєстрація</Text>

              <LoginInput
                value={form.login}
                errorMessage={errors.login}
                onChageText={handleLoginChange}
              ></LoginInput>
              <EmailInput
                onChangeText={handleEmailChange}
                errorMessage={errors.email}
              ></EmailInput>
              <PasswordInput
                onChangeText={handlePasswordChange}
                errorMessage={errors.password}
              ></PasswordInput>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => onRegister()}
              >
                <Text style={styles.registerButtonText}>Зареєструватися</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onLogin()}
                style={styles.loginLink}
              >
                <Text style={styles.loginLinkText}>
                  Вже зареєстровані? Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "white",
    // height: 500,
    width: "100%",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 30,
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "500",
  },
  registerButton: {
    width: "100%",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 16,
    textAlign: "center",
  },
  loginLink: {
    marginTop: 16,
    textAlign: "center",
  },
  loginLinkText: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
