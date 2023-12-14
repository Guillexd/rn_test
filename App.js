import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { colors } from "./src/global/colors";
import { useCallback, useState } from "react";
import Home from "./src/screens/Home";
import ItemListCategories from "./src/screens/ItemListCategories";
import ItemDetail from "./src/screens/ItemDetail";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Josefin': require('./assets/Fonts/JosefinSans-Italic-VariableFont_wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  const [category, setCategory] = useState("");
  const [character, setCharacter] = useState({});

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor={colors.gray1} />
      {Object.keys(character).length > 0 ? (
        <ItemDetail character={character} setCharacter={setCharacter}  />
      ) : category.length > 0 ? (
        <ItemListCategories category={category} setCategory={setCategory} setCharacter={setCharacter} />
      ) : (
        <Home setCategory={setCategory} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray1,
    alignItems: "center",
  },
});
