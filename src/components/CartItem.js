import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import { memo, useEffect, useState } from "react";
import CartItemModal from "./CartItemModal";
import { useDispatch, useSelector } from "react-redux";
import { setFalseReload } from "../features/characterList/characterListSlice";
import useDebounce from "../utils/useDebounce";

export default memo(function CartItem({
  character,
  navigation,
  setDataFormated,
}) {
  const charactersInKartInfo = useSelector(
    (state) => state.characterList.value.charactersInKartInfo
  );
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [helper, setHelper] = useState(false);
  const [quantity, setQuantity] = useState(
    charactersInKartInfo
      .find((value) => value.id === character.id)
      ?.quantity?.toString() ?? "1"
  );
  const { debounceValue } = useDebounce(quantity)
  const dispatch = useDispatch();
  useEffect(() => {
    if (helper) {
      const parsedQuantity = parseInt(quantity, 10);

      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        setQuantity("1");
      }
      setDataFormated((value) =>
        value.map((el) =>
          el.id === character.id ? { ...el, quantity: parseInt(quantity) } : el
        )
      );
    }
  }, [debounceValue]);
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleQuantity = (t) => {
    setHelper(true);
    setQuantity(parseInt(t).toString());
  };

  const handleIncrease = () => {
    setHelper(true);
    setQuantity((value) => (parseInt(value) + 1).toString());
  };

  const handleDecrease = () => {
    setHelper(true);
    setQuantity((value) => (parseInt(value) - 1).toString());
  };
  return (
    <>
      <Pressable
        style={[styles.container, isPressed && styles.pressablePressed]}
        onLongPress={() => {
          dispatch(setFalseReload());
          navigation.navigate("CartDetail", { character });
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          style={{
            height: 130,
            width: "50%",
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: character.image,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={{ color: colors.green2, fontWeight: "bold" }}>
            {character.name}
          </Text>
          <Text style={{ color: colors.green2 }}>
            Especie: {character.species}
          </Text>
          <Text style={{ color: colors.green2 }}>
            Género: {character.gender}
          </Text>
          <Text style={{ color: colors.orange, fontWeight: "bold" }}>
            Precio: ${parseInt(quantity) * 100}.00
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={handleDecrease} disabled={quantity <= 1}>
              <AntDesign name="minuscircleo" size={27} color="white" />
            </TouchableOpacity>
            <TextInput
              style={{ color: colors.white, textAlign: "center" }}
              keyboardType="numeric"
              value={quantity}
              maxLength={3}
              onChangeText={handleQuantity}
            />
            <TouchableOpacity onPress={handleIncrease}>
              <AntDesign name="pluscircleo" size={27} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.options}
          onPress={() => setShowModal(true)}
        >
          <MaterialIcons name="remove-shopping-cart" size={27} color="white" />
        </TouchableOpacity>
        <Text style={styles.info}>
          Mantener presionado para ver más detalles
        </Text>
      </Pressable>
      <CartItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        setDataFormated={setDataFormated}
        character={character}
      />
    </>
  );
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
  },
  options: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  pressablePressed: {
    backgroundColor: "#252A32",
  },
  info: {
    color: "red",
    position: "absolute",
    bottom: 0,
    left: "13%",
  },
});
