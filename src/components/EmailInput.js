import { StyleSheet, TextInput, Text, View } from "react-native";
import { colors } from "../styles/global";
import { useState } from "react";

const EmailInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, isFocused && styles.focused]}
          placeholder="Адреса електронної пошти"
          value={props.value}
          onChangeText={props.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {props.errorMessage && (
          <View style={{ marginLeft: 16 }}>
            <Text style={{ color: colors.red }}>{props.errorMessage}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    fontSize: 16,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});

export default EmailInput;
