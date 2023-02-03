import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    pink: '#ff4cc1',
    cyan: '#38e0e0',
    bgDark: ' #1a1a1a',
    itemBgDark: '#262626',
    green: '#29d792',
    textDark: '#c9c9c9',
    inactiveTextDark: '#a2a2a2',
    iconColor: '#a3a3a3',
    purple: '#4a293e',
    blueGreen: '#1e4544',
  },
});

type CustomThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
export default theme;
