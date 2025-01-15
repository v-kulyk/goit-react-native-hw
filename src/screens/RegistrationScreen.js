import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <ImageBackground
        source={require("../../assets/mountain-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Text style={styles.addPhotoText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Реєстрація</Text>

          <TextInput
            style={styles.input}
            placeholder="Логін"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            keyboardType="default"
          />

          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              <Text style={styles.showPasswordText}>Показати</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Зареєструватися</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -60,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoButton: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    color: "#FF6C00",
    fontSize: 20,
    lineHeight: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 43,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 16,
    fontSize: 16,
  },
  showPasswordButton: {
    paddingRight: 16,
  },
  showPasswordText: {
    color: "#1B4371",
    fontSize: 16,
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
  },
  loginLinkText: {
    color: "#1B4371",
    fontSize: 16,
  },
});
