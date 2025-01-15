import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";

export default function App() {
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <RegistrationScreen></RegistrationScreen>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <StatusBar style="inverted" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
