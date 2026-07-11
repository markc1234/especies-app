import { FC } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const CustomTextInput: FC<TextInputProps> = (props) => {
  const { style, ...restProps } = props;
  return (
    <TextInput
      placeholderTextColor="#888888"
      {...restProps}
      style={[styles.inputStyle, style]}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 3,
    color: "black",
  },
});