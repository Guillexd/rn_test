import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import CartItem from "../components/CartItem";
import { colors } from "../global/colors";
import useData from "../utils/useData";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewCharacters,
  setNewCharactersInKartInfo,
  setFalseReload,
} from "../features/characterList/characterListSlice";
import { useFocusEffect } from "@react-navigation/native";
import CartInfo from "../components/CartInfo";

export default function CartList({ navigation }) {
  const characters = useSelector(
    (state) => state.characterList.value.characters
  );
  const charactersInKartInfo = useSelector(
    (state) => state.characterList.value.charactersInKartInfo
  );
  const mustReload = useSelector(
    (state) => state.characterList.value.mustReload
  );
  const [dataFormated, setDataFormated] = useState([]);
  const { data, loading } = useData(
    `https://rickandmortyapi.com/api/character/${characters}`,
    [characters]
  );
  const dispatch = useDispatch();
  const dataFormatedRef = useRef();
  useEffect(() => {
    if (!loading) {
      if (Array.isArray(data)) {
        const newData = data.map((value) => {
          const match = charactersInKartInfo.find((el) => el.id === value.id);
          if (match) {
            return {
              ...value,
              quantity: match.quantity,
            };
          } else {
            return {
              ...value,
              quantity: 1,
            };
          }
        });
        setDataFormated(newData);
      } else if (data.info) {
        setDataFormated([]);
      } else {
        setDataFormated(() => {
          const match = charactersInKartInfo.find((el) => el.id === data.id);
          if (match) {
            return [{ ...data, quantity: match.quantity }];
          } else {
            return [{ ...data, quantity: 1 }];
          }
        });
      }
    }
  }, [data, loading]);
  useEffect(() => {
    if (!loading) {
      dataFormatedRef.current = dataFormated;
      console.log("dataFormated ---- :3", new Date());
      dispatch(setNewCharactersInKartInfo(dataFormated));
    }
  }, [dataFormated]);
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (mustReload) {
          const newIds = dataFormatedRef.current.map(
            (character) => character.id
          );
          dispatch(setFalseReload());
          dispatch(setNewCharacters(newIds));
        }
      };
    }, [mustReload])
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
        {loading ? (
          <ActivityIndicator size={100} />
        ) : dataFormated.error || dataFormated.length === 0 ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            No hay productos guardados en este carrito.
          </Text>
        ) : (
          <FlatList
            data={dataFormated}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem
                character={item}
                navigation={navigation}
                dataFormated={dataFormated}
                setDataFormated={setDataFormated}
              />
            )}
          />
        )}
      </View>
      <CartInfo />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 80,
  },
});
