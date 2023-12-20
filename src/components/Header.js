import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title, goBack = false }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {goBack && (
        <Pressable
          style={{ position: "absolute", left: 20, zIndex: 999 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="leftcircle" size={35} color={colors.green2} />
        </Pressable>
      )}
      <Text style={[styles.text, goBack && { paddingLeft: 40 }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.gray3,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontFamily: "Josefin",
    fontSize: 22,
    textAlign: "center",
  },
});
