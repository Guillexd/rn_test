import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../global/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function CartInfo() {
  const charactersInKartInfo = useSelector(
    (state) => state.characterList.value.charactersInKartInfo
  );
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const price = charactersInKartInfo.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity * 100,
      0
    );
    setTotalPrice(price);
  }, [charactersInKartInfo]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${totalPrice}.00</Text>
      <TouchableOpacity style={styles.buttomContainer}>
        <FontAwesome name="check" size={24} color="white" />
        <Text style={styles.textButtom}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.gray3,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  buttomContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: colors.green1,
    fontWeight: "bold",
    fontSize: 25,
  },
  textButtom: {
    color: colors.white,
  },
});
