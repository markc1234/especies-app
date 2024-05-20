import DateTimePicker, {
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { FC, useState } from "react";
import { TextStyle, View, Text, Button, Pressable } from "react-native";
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";
import { TextNunitoSans } from "./TextNunitoSans";

type DateTimeModalInputProps = Omit<
  ReactNativeModalDateTimePickerProps,
  "isVisible" | "onCancel"
> & {
  placeholder?: string;
  placeholderStyle?: TextStyle;
};
export const DateTimeModalInput: FC<DateTimeModalInputProps> = (props) => {
  const {
    style,
    date,
    placeholder,
    placeholderStyle,
    onConfirm,
    ...restProps
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    onConfirm?.(newDate);
    hideDatePicker();
  };

  return (
    <Pressable onPress={showDatePicker} style={style}>
      {placeholder && <Text style={placeholderStyle}>{placeholder}</Text>}
      <Text style={{ color: "black" }}>{date?.toLocaleDateString() ?? ""}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
        {...restProps}
      />
    </Pressable>
  );
};
