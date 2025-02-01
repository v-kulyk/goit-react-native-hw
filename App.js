import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";

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

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {},
});
