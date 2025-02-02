import { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

const Input = ({
  value,
  onTextChange,
  placeholder,
  errorMessage,
  rightButton,
  autofocus = false,
  secureTextEntry = false,
  onBlur: onBlurCustom,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);

    if (onBlurCustom) {
      onBlurCustom();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.input, isFocused && styles.focused]}>
        <TextInput
          value={value}
          autoFocus={autofocus}
          onChangeText={onTextChange}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.baseText}
          autoCapitalize="none"
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {rightButton}
      </View>

      {errorMessage && (
        <View style={{ marginLeft: 16 }}>
          <Text style={{ color: colors.red }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  baseText: {
    height: 50,
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  focused: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
  },
});

export default Input;
