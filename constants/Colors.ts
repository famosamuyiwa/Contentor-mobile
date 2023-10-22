const tintColorLight = 'rgba(99, 73, 255, 1)';
const tintColorDark = 'rgba(39, 23, 140, 1)';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    buttonText:'#fff',
    buttonBackground: tintColorLight,
    focus: tintColorLight,
    borderColor: '#ccc',
    buttonBackgroundInactive: "#ccc"
  },

  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    buttonText:'#fff',
    buttonBackground: tintColorDark,
    focus: tintColorDark,
    borderColor: '#ccc',
    buttonBackgroundInactive: "#a1a1a1"
  },
};
