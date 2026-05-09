import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  colors,
  fontSize,
  radius,
  spacing,
} from '../styles/appStyles';

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function SearchBar({
  value,
  placeholder,
  onChangeText,
  onClear,
}: SearchBarProps): React.JSX.Element {
  const hasValue = value.trim().length > 0;

  return (
    <View style={[styles.container, hasValue ? styles.containerActive : null]}>
      <Text style={styles.searchIcon}>🔍</Text>

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {hasValue ? (
        <TouchableOpacity
          style={styles.clearButton}
          activeOpacity={0.7}
          onPress={onClear}>
          <Text style={styles.clearText}>×</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  containerActive: {
    borderColor: colors.primary,
  },
  searchIcon: {
    fontSize: fontSize.md,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.md,
    paddingVertical: 0,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  clearText: {
    color: colors.primary,
    fontSize: 22,
    lineHeight: 24,
  },
});