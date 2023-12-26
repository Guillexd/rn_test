import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ItemDetail from "../screens/ItemDetail";
import ItemListCategories from "../screens/ItemListCategories";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function ShopNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => {
          return {
            header: () => <Header title="Categorias" />,
          };
        }}
      />
      <Stack.Screen
        name="CharacterList"
        component={ItemListCategories}
        options={({ route }) => {
          return {
            header: () => (
              <Header
                title={`Lista de personajes - Categoría: ${
                  route.params?.category.split("=")[1]
                }`}
                goBack={true}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Character"
        component={ItemDetail}
        options={({ route }) => {
          return {
            header: () => (
              <Header
                title={`Detalles de ${route.params?.character?.name}`}
                goBack={true}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
