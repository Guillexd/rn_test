import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { colors } from "../global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addCharacter,
  removeCharacter,
} from "../features/characterList/characterListSlice";

export default function CharacterItem({ character, navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const characters = useSelector(
    (state) => state.characterList.value.characters
  );
  const dispatch = useDispatch();

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleAddCharacterToKart = () => {
    dispatch(addCharacter({ id: character.id }));
  };

  const handleRemoveCharacterFromKart = () => {
    dispatch(removeCharacter({ id: character.id }));
  };

  return (
    <Pressable
      style={[styles.container, isPressed && styles.pressablePressed]}
      onLongPress={() => navigation.navigate("Character", { character })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Image
        style={{
          height: 170,
          borderRadius: 20,
          resizeMode: "contain",
        }}
        source={{
          uri: character.image,
        }}
      />
      <Text style={styles.text}>Nombre: {character.name}</Text>
      <Text style={styles.text}>Especie: {character.species}</Text>
      <Text style={styles.text}>Género: {character.gender}</Text>
      <Text style={styles.price}>Precio $100.00</Text>
      {!characters.some((charac) => charac === character.id) ? (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleAddCharacterToKart}
        >
          <MaterialIcons
            name="add-shopping-cart"
            size={40}
            color={colors.green4}
          />
          <Text style={{ color: colors.green4 }}>Agregar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleRemoveCharacterFromKart}
        >
          <MaterialIcons name="remove-shopping-cart" size={40} color={"red"} />
          <Text style={{ color: "red" }}>Quitar</Text>
        </TouchableOpacity>
      )}
      <Text style={{ color: "red" }}>
        Mantén presionado para ver más detalles
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray2,
    margin: 5,
    borderRadius: 30,
    flex: 1,
    padding: 15,
  },
  text: {
    color: colors.white,
    fontSize: 17,
    marginVertical: 1,
  },
  price: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 18,
  },
  pressablePressed: {
    backgroundColor: colors.gray3,
  },
});
