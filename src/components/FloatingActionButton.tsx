import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  colors,
  fontSize,
  fontWeight,
  shadow,
} from '../styles/appStyles';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({
  onPress,
}: FloatingActionButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  icon: {
    color: colors.textLight,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.regular,
    lineHeight: 30,
  },
});