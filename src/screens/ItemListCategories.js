import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
import CharacterItem from "../components/CharacterItem";
import Search from "../components/Search";
import useData from "../utils/useData";
import { useState } from "react";
import { colors } from "../global/colors";

export default function ItemListCategories({ navigation, route }) {
  const { category } = route.params;
  const [filter, setFilter] = useState("");
  const { data, loading } = useData(
    `https://rickandmortyapi.com/api/character?${category}&${filter}`,
    [filter]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.gray1,
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Search
          setKeyword={(text) => setFilter(`name=${text}`)}
          loading={loading}
        />
        {loading ? (
          <ActivityIndicator size={100} />
        ) : data.error ? (
          <Text style={{ color: "red" }}>
            No hay personajes con este nombre
          </Text>
        ) : (
          <FlatList
            data={data.results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CharacterItem character={item} navigation={navigation} />
            )}
            numColumns={2}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 60,
  },
});
