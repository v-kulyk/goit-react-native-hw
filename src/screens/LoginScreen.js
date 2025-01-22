import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { useReducer, useState } from "react";

const LoginScreen = ({ updateRegistered }) => {
  const [form, setForm] = useReducer(
    (state, action) => {
      return { ...state, [action.type]: action.payload };
    },
    {
      email: "",
      password: "",
    }
  );

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const errorsMessages = {
    email: "Введіть адресу електронної пошти",
    password: "Введіть пароль",
  };

  const validateForm = () => {
    const currentErrors = {
      email: "",
      password: "",
    };
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

  const handleEmailChange = (value) => {
    setForm({ type: "email", payload: value });
  };
  const handlePasswordChange = (value) => {
    setForm({ type: "password", payload: value });
  };

  const onLogin = async () => {
    if (!validateForm()) {
      return;
    }
    console.log(form);
  };

  const onSignUp = () => {
    updateRegistered(false);
  };
  return (
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
            <Text style={styles.title}>Увійти</Text>
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
              onPress={() => onLogin()}
            >
              <Text style={styles.registerButtonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSignUp()}
              style={styles.loginLink}
            >
              <Text style={styles.loginLinkText}>
                Немає акаунтy? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "white",
    height: 450,
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
  loginLinkText: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
