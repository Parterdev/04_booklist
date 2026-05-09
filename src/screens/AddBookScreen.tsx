import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppHeader, AppTextInput} from '../components';
import {RootStackParamList} from '../navigation';
import {BookFormErrors, NewBook} from '../types/book';
import {createBook} from '../database';
import {hasBookFormErrors, validateBookForm} from '../utils';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from '../styles/appStyles';

type AddBookScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddBook'
>;

const initialForm: NewBook = {
  title: '',
  author: '',
  year: '',
  genre: '',
};

export function AddBookScreen({
  navigation,
}: AddBookScreenProps): React.JSX.Element {
  const [form, setForm] = useState<NewBook>(initialForm);
  const [errors, setErrors] = useState<BookFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (field: keyof NewBook, value: string): void => {
    setForm(currentForm => ({
      ...currentForm,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(currentErrors => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }
  };

  const handleSave = async (): Promise<void> => {
    const validationErrors = validateBookForm(form);

    if (hasBookFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSaving(true);

      await createBook(form);

      Alert.alert(
        'Libro guardado',
        'El libro se agregó correctamente a tu biblioteca.',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Error al guardar',
        'No se pudo guardar el libro. Inténtalo nuevamente.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Nuevo Libro"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Agrega un libro a tu biblioteca</Text>
            <Text style={styles.heroSubtitle}>
              Completa la información principal del libro antes de guardarlo.
            </Text>
          </View>

          <AppTextInput
            label="Título"
            required
            value={form.title}
            placeholder="Ej. Clean Code"
            error={errors.title}
            onChangeText={text => updateField('title', text)}
          />

          <AppTextInput
            label="Autor"
            required
            value={form.author}
            placeholder="Ej. Robert C. Martin"
            error={errors.author}
            onChangeText={text => updateField('author', text)}
          />

          <AppTextInput
            label="Año"
            required
            value={form.year}
            placeholder="Ej. 2008"
            keyboardType="numeric"
            error={errors.year}
            onChangeText={text => updateField('year', text)}
          />

          <AppTextInput
            label="Género"
            required
            value={form.genre}
            placeholder="Ej. Programación"
            error={errors.genre}
            onChangeText={text => updateField('genre', text)}
          />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              isSaving ? styles.primaryButtonDisabled : null,
            ]}
            activeOpacity={0.8}
            disabled={isSaving}
            onPress={handleSave}>
            <Text style={styles.primaryButtonText}>
              {isSaving ? 'Guardando...' : 'Guardar Libro'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            disabled={isSaving}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  hero: {
    marginBottom: spacing.lg,
  },
  heroTitle: {
    color: colors.primaryDark,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    lineHeight: 22,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  primaryButtonDisabled: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: colors.textLight,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  secondaryButton: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  secondaryButtonText: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});