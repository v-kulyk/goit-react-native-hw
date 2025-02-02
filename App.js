import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";

import store from "./src/redux/store/store";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { authStateChanged } from "./src/utils/auth";
import { useEffect } from "react";

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
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
