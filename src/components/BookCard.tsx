import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  colors,
  fontSize,
  fontWeight,
  getCardColorById,
  radius,
  shadow,
  spacing,
} from '../styles/appStyles';
import {Book} from '../types/book';

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({
  book,
  index = 0,
}: BookCardProps): React.JSX.Element {
  const cardColor = getCardColorById(book.id);

  const cardVariantStyles = [
    styles.cardVariantOne,
    styles.cardVariantTwo,
    styles.cardVariantThree,
  ];

  const selectedCardVariant = cardVariantStyles[index % cardVariantStyles.length];

  return (
    <View style={[styles.card, selectedCardVariant]}>
      <View
        style={[
          styles.accentLine,
          {
            backgroundColor: cardColor.accent,
          },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>por {book.author}</Text>
          </View>

          <View
            style={[
              styles.categoryDot,
              {
                backgroundColor: cardColor.accent,
              },
            ]}
          />
        </View>

        <View style={styles.metaContainer}>
          <View
            style={[
              styles.yearBadge,
              {
                backgroundColor: cardColor.background,
              },
            ]}>
            <Text
              style={[
                styles.yearText,
                {
                  color: cardColor.text,
                },
              ]}>
              {book.year}
            </Text>
          </View>

          <View
            style={[
              styles.genreBadge,
              {
                backgroundColor: cardColor.background,
              },
            ]}>
            <Text
              style={[
                styles.genreText,
                {
                  color: cardColor.text,
                },
              ]}>
              {book.genre}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadow.card,
  },
  cardVariantOne: {
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  cardVariantTwo: {
    borderTopRightRadius: radius.md,
    borderBottomRightRadius: radius.xl,
  },
  cardVariantThree: {
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.md,
  },
  accentLine: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    color: colors.primaryDark,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  author: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: spacing.xs,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  yearBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  yearText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  genreBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  genreText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
});