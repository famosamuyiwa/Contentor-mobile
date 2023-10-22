/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';

import Colors from '../constants/Colors';
import { RPP } from '../utils';
import { useEffect, useState } from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'] 
export type DefaultTextInputProps = ThemeProps & DefaultTextInput['props'] & {lightFocusColor?: string, darkFocusColor?: string}
export type ViewProps = ThemeProps & DefaultView['props'] & {isActive?: boolean}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useThemeColorDefault(){

  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'borderColor');
  const iconColor = useThemeColor({}, 'text');
  const buttonTextColor = useThemeColor({}, 'buttonText');
  const borderColorFocused = useThemeColor({}, 'focus')

  return {
    textColor,
    tintColor,
    backgroundColor,
    borderColor,
    iconColor,
    buttonTextColor,
    borderColorFocused
  }
}


export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[ { color }, {fontSize:RPP(14)}, {fontFamily: "Satoshi_Regular"}, style]} {...otherProps} />;
}


export function TextInput(props: DefaultTextInputProps) {


  const { style, lightColor, lightFocusColor, darkFocusColor, darkColor,  ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColorUnfocused = useThemeColor({ light: lightFocusColor, dark: darkFocusColor}, 'borderColor')
  const borderColorFocused = useThemeColor({ light: lightFocusColor, dark: darkFocusColor}, 'focus')

  const [borderColor, setBorderColor] = useState(borderColorUnfocused)

  return <DefaultTextInput style={[ { borderColor } ,{ color }, {fontSize:RPP(14)}, {fontFamily: "Satoshi_Regular"}, style]} onFocus={() => {setBorderColor(borderColorFocused)}} onBlur={() => {setBorderColor(borderColorUnfocused)}} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
export function Button(props: ViewProps) {
  const { style, lightColor, darkColor, isActive, ...otherProps } = props;
  const backgroundColorActive = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground');
  const backgroundColorInactive = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackgroundInactive');
  

  return <DefaultView style={[{ backgroundColor: `${isActive? backgroundColorActive : backgroundColorInactive}` }, style]} {...otherProps} />;
}
