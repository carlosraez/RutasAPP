import React from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({ iconName, onPress, style }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity onPress={onPress} style={styles.fabButton}>
        <Icon name={iconName} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabButton: {
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
