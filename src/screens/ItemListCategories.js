import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { AntDesign } from '@expo/vector-icons';
import CharacterItem from "../components/CharacterItem";
import Search from "../components/Search";
import useData from "../utils/useData";
import { useState } from "react";
import { colors } from "../global/colors";

export default function ItemListCategories({ category, setCategory, setCharacter }) {
  const [filter, setFilter] = useState('')
  const { data, loading } = useData(
    `https://rickandmortyapi.com/api/character?${category}&${filter}`,
    [filter]
  );

  return (
    <>
      <Header title={`Lista de personajes - Categoría: ${category.split("=")[1]}`} />
      <TouchableOpacity 
        style={{ backgroundColor: colors.green2, width: '100%', padding: 5, alignItems: 'center'}}
        onPress={() => setCategory('')}>
        <AntDesign name="banckward" size={24} color="black" />
        <Text>Volver a la lista de categorias</Text>
      </TouchableOpacity>
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
            renderItem={({ item }) => <CharacterItem character={item} setCharacter={setCharacter} />}
            numColumns={2}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingBottom: 200,
  },
});
