import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors } from "../styles/global";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, isFocused && styles.focused]}
            placeholder="Пароль"
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
        {props.errorMessage && (
          <View style={{ marginLeft: 16, marginTop: 8 }}>
            <Text style={{ color: colors.red }}>{props.errorMessage}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 42,
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 16,
  },
  showPasswordButton: {
    paddingRight: 8,
  },
  showPasswordText: {
    color: "#1B4371",
    fontSize: 16,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});

export default PasswordInput;
