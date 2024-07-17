import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View className=" flex w-full h-full items-center justify-center">
      <Text>Newi</Text>
      {/* <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}></Stack.Screen>
      </Stack> */}
    </View>
  );
}
