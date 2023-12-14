import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Keyboard,
} from "react-native";
import { colors } from "../global/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react";

export default function Search({ setKeyword, loading }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const [isPressedSearch, setIsPressedSearch] = useState(false);

  const handlePressInSearch = () => {
    setIsPressedSearch(true);
  };

  const handlePressOutSearch = () => {
    setIsPressedSearch(false);
  };

  const [isPressedX, setIsPressedX] = useState(false);

  const handlePressInX = () => {
    setIsPressedX(true);
  };

  const handlePressOutX = () => {
    setIsPressedX(false);
  };

  const search = () => {
    const expression = /.*[0-9].*/;
    if (expression.test(input)) {
      setError("No debe contener números");
    } else {
      setError("");
      setKeyword(input);
    }
  };
  const removeItem = () => {
    setInput("");
    setError("");
    setKeyword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Buscar personaje por nombre"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="gray"
          editable={!loading}
        />
        <Pressable
          onPress={() => {
            search();
            Keyboard.dismiss();
          }}
          onPressIn={handlePressInSearch}
          onPressOut={handlePressOutSearch}
        >
          <AntDesign
            name="search1"
            color={isPressedSearch ? colors.green2 : colors.green3}
            size={isPressedSearch ? 30 : 25}
          />
        </Pressable>
        <Pressable
          onPress={removeItem}
          onPressIn={handlePressInX}
          onPressOut={handlePressOutX}
        >
          <Entypo
            name="circle-with-cross"
            color={isPressedX ? colors.green2 : colors.green3}
            size={isPressedX ? 30 : 25}
          />
        </Pressable>
      </View>
      {error.length > 1 && <Text style={styles.errorInput}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  input: {
    color: colors.white,
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.gray2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 10,
  },
  errorInput: {
    color: "red",
    paddingBottom: 5,
    marginLeft: 20,
  },
});
