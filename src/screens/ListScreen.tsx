import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import {
  AppHeader,
  BookCard,
  EmptyState,
  FloatingActionButton,
  SearchBar,
} from '../components';
import { getBooks } from '../database';
import { RootStackParamList } from '../navigation';
import { Book } from '../types/book';
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../styles/appStyles';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

export function ListScreen({
  navigation,
}: ListScreenProps): React.JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadBooks = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const storedBooks = await getBooks();
      setBooks(storedBooks);
    } catch (error) {
      console.log('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, []),
  );

  const filteredBooks = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return books;
    }

    return books.filter(book => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();

      return title.includes(query) || author.includes(query);
    });
  }, [books, searchText]);

  const hasBooks = books.length > 0;
  const hasSearchText = searchText.trim().length > 0;
  const hasFilteredBooks = filteredBooks.length > 0;

  const counterLabel = hasSearchText
    ? `${filteredBooks.length} resultado${filteredBooks.length === 1 ? '' : 's'
    } encontrado${filteredBooks.length === 1 ? '' : 's'} para "${searchText}"`
    : `${books.length} libro${books.length === 1 ? '' : 's'} en tu biblioteca`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Mi Librería" />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>BookList</Text>

          <Text style={styles.description}>
            Tu biblioteca personal para registrar libros leídos o pendientes.
          </Text>

          <SearchBar
            value={searchText}
            placeholder="Buscar por título o autor..."
            onChangeText={setSearchText}
            onClear={() => setSearchText('')}
          />

          <Text style={styles.counterText}>{counterLabel}</Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Cargando libros...</Text>
            </View>
          ) : null}

          {!isLoading && !hasBooks ? (
            <EmptyState
              title="Aún no tienes libros registrados"
              description="Presiona el botón + para agregar tu primer libro a la biblioteca."
            />
          ) : null}

          {!isLoading && hasBooks && !hasFilteredBooks ? (
            <EmptyState
              title="No se encontraron libros"
              description={`No hay resultados para "${searchText}". Intenta buscar por otro título o autor.`}
            />
          ) : null}

          {!isLoading && hasFilteredBooks
            ? filteredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))
            : null}
        </ScrollView>

        <FloatingActionButton onPress={() => navigation.navigate('AddBook')} />
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
    paddingBottom: 120,
  },
  sectionTitle: {
    color: colors.primaryDark,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  counterText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
});