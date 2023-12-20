import { StyleSheet, Text, Pressable, Image, SafeAreaView } from "react-native";
import { colors } from "../global/colors";
import { useState } from "react";

export default function ItemDetail({ navigation, route }) {
  const { character } = route.params;

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.gray1,
        alignItems: "center",
        padding: 5
      }}
    >
      <Pressable
        style={[styles.container, isPressed && styles.pressablePressed]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          style={{
            height: 300,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: character.image,
          }}
        />
        <Text style={styles.text}>Nombre: {character.name}</Text>
        <Text style={styles.text}>Estado: {character.status}</Text>
        <Text style={styles.text}>Especie: {character.species}</Text>
        <Text style={styles.text}>Género: {character.gender}</Text>
        <Text style={styles.text}>Ubicación: {character.location?.name}</Text>
        <Text style={styles.text}>Origen: {character.origin?.name}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.gray2,
    margin: 5,
    borderRadius: 30,
    flex: 1,
    padding: 15,
  },
  text: {
    color: colors.green2,
    fontSize: 20,
    marginVertical: 8,
    fontFamily: 'Josefin',
  },
  pressablePressed: {
    backgroundColor: colors.gray3,
  },
});
