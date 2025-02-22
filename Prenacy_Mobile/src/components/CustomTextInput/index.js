import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({
  style,
  onFocusColor = "#615EFC", // Màu viền khi nhận focus
  defaultBorderColor = "black", // Màu viền mặc định
  onFocus, // Các sự kiện onFocus từ props nếu có
  onBlur, // Các sự kiện onBlur từ props nếu có
  ...props
}) => {
  const [borderColor, setBorderColor] = useState(defaultBorderColor);

  return (
    <TextInput
      {...props}
      style={[styles.input, style, { borderColor }]}
      onFocus={(e) => {
        setBorderColor(onFocusColor);
        if (onFocus) {
          onFocus(e);
        }
      }}
      onBlur={(e) => {
        setBorderColor(defaultBorderColor);
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default CustomTextInput;
