import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { useState } from "react";

export default function App() {
  const [registered, setRegistered] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/static/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto/static/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/static/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (registered) {
    return <LoginScreen updateRegistered={setRegistered}></LoginScreen>;
  }

  return (
    <RegistrationScreen updateRegistered={setRegistered}></RegistrationScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
