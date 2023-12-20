import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Categories from "../components/Categories";
import { colors } from "../global/colors";

export default function Home({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.gray1,
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Categories navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
