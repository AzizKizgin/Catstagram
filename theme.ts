import {extendTheme} from 'native-base';

const themeColors = {
  pink: '#ff4cc1',
  cyan: '#1f8686',
  bgDark: '#1a1a1a',
  itemBgDark: '#262626',
  green: '#29d792',
  textDark: '#c9c9c9',
  inactiveTextDark: '#a2a2a2',
  iconColor: '#a3a3a3',
  purple: '#4a293e',
  blueGreen: '#1e4544',
  yellow: '#ffcc00',
};

const theme = extendTheme({
  colors: {
    pink: themeColors.pink,
    cyan: themeColors.cyan,
    bgDark: themeColors.bgDark,
    itemBgDark: themeColors.itemBgDark,
    green: themeColors.green,
    textDark: themeColors.textDark,
    inactiveTextDark: themeColors.inactiveTextDark,
    iconColor: themeColors.iconColor,
    purple: themeColors.purple,
    blueGreen: themeColors.blueGreen,
    yellow: themeColors.yellow,
  },
  space: {
    xxs: 2,
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  components: {
    Pressable: {
      baseStyle: {
        _pressed: {
          opacity: 0.5,
        },
      },
      variants: {
        login: {
          borderBottomWidth: 1,
          borderBottomColor: 'cyan',
          paddingX: 'xs',
        },
      },
    },
  },
});

type CustomThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
export default theme;
