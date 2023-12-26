import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import { useDispatch } from "react-redux";
import { setTrueReload } from "../features/characterList/characterListSlice"

export default function CartItemModal({
  showModal,
  setShowModal,
  setDataFormated,
  character,
}) {
  const dispatch = useDispatch()
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modal}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setTrueReload())
            setDataFormated((value) =>
              value.filter((charac) => charac.id !== character.id)
            );
            setShowModal(false);
          }}
          style={styles.modalOptions}
        >
          <MaterialCommunityIcons
            name="delete-off-outline"
            size={40}
            color="white"
          />
          <Text
            style={styles.modalText}
          >{`Eliminar a ${character.name} del carrito`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={styles.modalOptions}
        >
          <Octicons
            name="circle-slash"
            size={30}
            color="white"
            style={{ paddingHorizontal: 5 }}
          />
          <Text style={styles.modalText}>{`Cancelar acción`}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(26, 30, 37, 0.9)",
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  modalOptions: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  modalText: {
    color: colors.white,
    marginLeft: 15,
  },
});
