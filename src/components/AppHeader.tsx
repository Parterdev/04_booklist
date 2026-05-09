import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors, fontSize, fontWeight, spacing} from '../styles/appStyles';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function AppHeader({
  title,
  showBackButton = false,
  onBackPress,
}: AppHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBackPress}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.sm,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.textLight,
    fontSize: 34,
    lineHeight: 34,
  },
  title: {
    color: colors.textLight,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
});