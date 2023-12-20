import { StatusBar } from "react-native";
import { colors } from "./src/global/colors";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigator from "./src/navigation/Navigator";

SplashScreen.preventAutoHideAsync();    

export default function App() {

  const [fontsLoaded] = useFonts({
    'Josefin': require('./assets/Fonts/JosefinSans-Italic-VariableFont_wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
       SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.gray3} />
      <Navigator onLayoutRootView={onLayoutRootView} />
    </>
  );
}