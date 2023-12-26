import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import CartList from "../screens/CartList";
import ItemDetail from "../screens/ItemDetail";

const Stack = createNativeStackNavigator();

export default function CartNavigator() {
  return (
    <Stack.Navigator initialRouteName="CartContainer">
      <Stack.Screen
        name="CartContainer"
        component={CartList}
        options={() => {
          return {
            header: () => <Header title="Carrito de compras" />,
          };
        }}
      />
      <Stack.Screen
        name="CartDetail"
        component={ItemDetail}
        options={() => {
            return {
              header: ({ route }) => <Header title={`En el carrito - ${route.params?.character?.name}`} goBack={true} />,
            };
          }}
      />
    </Stack.Navigator>
  );
}