import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {Provider as ReduxProvider} from 'react-redux'
import store from "../redux/store"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Satoshi_Light: require('../assets/fonts/satoshi/Satoshi_Light.otf'),
    Satoshi_Regular: require('../assets/fonts/satoshi/Satoshi_Regular.otf'),
    Satoshi_Medium: require('../assets/fonts/satoshi/Satoshi_Medium.otf'),
    Satoshi_Black: require('../assets/fonts/satoshi/Satoshi_Black.otf'),
    Satoshi_Bold: require('../assets/fonts/satoshi/Satoshi_Bold.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReduxProvider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="editProfile" options={{ headerShown: false, presentation:"modal" }}/>
        <Stack.Screen name="uploadOverview" options={{ headerShown: false, presentation:"fullScreenModal" }}/>
        <Stack.Screen name="[userId]" options={{ headerShown: false}}/>
      </Stack>
      </ReduxProvider>
    </ThemeProvider>
  );
}
