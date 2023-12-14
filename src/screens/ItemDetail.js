import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../global/colors";
import Header from "../components/Header";
import { useState } from "react";

export default function ItemListCategories({ character, setCharacter }) {

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <>
      <Header title={`Detalles de ${character.name}`} />
      <TouchableOpacity 
        style={{ backgroundColor: colors.green2, width: '100%', padding: 5, alignItems: 'center'}}
        onPress={() => setCharacter('')}>
        <AntDesign name="banckward" size={24} color="black" />
        <Text>Volver a la categoria</Text>
      </TouchableOpacity>
      <Pressable
        style={[styles.container, isPressed && styles.pressablePressed]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text>xd</Text>
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
    </>
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
    color: colors.green1,
    fontSize: 17,
    marginVertical: 8,
  },
  price: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  pressablePressed: {
    backgroundColor: colors.gray3,
  },
});
