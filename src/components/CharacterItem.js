import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useState } from "react";
import { colors } from '../global/colors';

export default function CharacterItem({ character, setCharacter }) {

    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
      setIsPressed(true);
    };
  
    const handlePressOut = () => {
      setIsPressed(false);
    };
  
    return (
      <Pressable
        style={[styles.container, isPressed && styles.pressablePressed]}
        onLongPress={() => setCharacter(character)}
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
  