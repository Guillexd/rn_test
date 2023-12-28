import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../global/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CartInfo({ loading }) {
  const charactersInKartInfo = useSelector(
    (state) => state.characterList.value.charactersInKartInfo
  );
  const [showModal, setShowModal] = useState(false);
  const totalPrice = useMemo(() => {
    return charactersInKartInfo.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity * 100,
      0
    );
  }, [charactersInKartInfo]);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>${totalPrice}.00</Text>
        <TouchableOpacity
          style={styles.buttomContainer}
          onPress={() => setShowModal(true)}
          disabled={loading}
        >
          <FontAwesome name="check" size={24} color="white" />
          <Text style={styles.textButtom}>Comprar</Text>
        </TouchableOpacity>
      </View>
      {showModal && (
        <Modal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.popUpContainer}>
              <AntDesign
                name="warning"
                size={180}
                color={colors.green3}
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.popUpText}>
                ¿Estás seguro de realizar esta compra?
              </Text>
              <Text style={styles.popUpWarning}>
                Esta acción no se podrá revertirla.
              </Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.popUpCancelButtonContainer}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.popUpCancelButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.popUpConfirmButtonContainer}>
                  <Text style={styles.popUpConfirmButton}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
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
    paddingHorizontal: 20,
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
    fontFamily: "Rubik",
    fontSize: 25,
  },
  textButtom: {
    color: colors.white,
    fontFamily: "Rubik",
    fontSize: 18,
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "rgba(26, 30, 37, 0.6)",
    justifyContent: "center",
  },
  popUpContainer: {
    height: "50%",
    backgroundColor: colors.gray3,
    marginHorizontal: 30,
    padding: 25,
    borderRadius: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  popUpText: {
    color: colors.green1,
    fontSize: 25,
    textAlign: "center",
  },
  popUpWarning: {
    color: colors.orange,
    textAlign: "center",
  },
  popUpCancelButtonContainer: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  popUpCancelButton: {
    color: colors.white,
    fontSize: 17,
  },
  popUpConfirmButtonContainer: {
    backgroundColor: colors.green2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  popUpConfirmButton: {
    color: colors.white,
    fontSize: 17,
  },
});
