import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useState } from "react";

export default function CategoryItem({ item, setCategory }) {
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
      onLongPress={() => setCategory(item.category)}
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
          uri: item.image,
        }}
      />
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1E25",
    margin: 5,
    borderRadius: 30,
    flex: 1,
    padding: 15,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginVertical: 8,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  pressablePressed: {
    backgroundColor: "#252A32",
  },
});
