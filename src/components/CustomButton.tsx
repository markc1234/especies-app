import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { TextNunitoSans } from './TextNunitoSans';

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.7} 
      style={containerStyles}
    >
      <TextNunitoSans style={textStyles}>{title}</TextNunitoSans>
    </TouchableOpacity>
  );
};

export default CustomButton;
