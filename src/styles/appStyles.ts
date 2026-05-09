export const colors = {
  primary: '#1F4E79',
  primaryDark: '#163A5C',
  primaryLight: '#E8F1F8',

  background: '#F4F7FA',
  surface: '#FFFFFF',

  text: '#1F2933',
  textMuted: '#6B7280',
  textLight: '#FFFFFF',

  border: '#D9E2EC',

  danger: '#C0392B',
  dangerLight: '#FDEDEC',

  success: '#2E7D32',
  successLight: '#E8F5E9',

  warning: '#F39C12',
  warningLight: '#FFF4E0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const shadow = {
  card: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
};

export const cardPalette = [
  {
    accent: '#1F77B4',
    background: '#E8F3FF',
    text: '#0B4F7A',
  },
  {
    accent: '#F39C12',
    background: '#FFF3DF',
    text: '#A35E00',
  },
  {
    accent: '#7B61FF',
    background: '#F0EDFF',
    text: '#4B32A8',
  },
  {
    accent: '#2E7D32',
    background: '#E8F5E9',
    text: '#1B5E20',
  },
  {
    accent: '#C0392B',
    background: '#FDEDEC',
    text: '#922B21',
  },
  {
    accent: '#00897B',
    background: '#E0F2F1',
    text: '#00695C',
  },
];

export function getCardColorById(id: string) {
  const hash = id
    .split('')
    .reduce((accumulator, character) => {
      return accumulator + character.charCodeAt(0);
    }, 0);

  return cardPalette[hash % cardPalette.length];
}