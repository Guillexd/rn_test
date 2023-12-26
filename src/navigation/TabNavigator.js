import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigator from "./ShopNavigator";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import { colors } from "../global/colors";
import CartNavigator from "./CartNavigator";


const Tab = createBottomTabNavigator();

export default function TabNavigator({ onLayoutRootView }) {
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
        initialRouteName="ShopNavigator"
      >
        <Tab.Screen
          name="ShopNavigator"
          component={ShopNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="house-user" size={24} color={focused ? colors.green1 : colors.green3} />
            ),
            tabBarActiveBackgroundColor: colors.gray1,
            tabBarInactiveBackgroundColor: colors.gray3,
            tabBarActiveTintColor: colors.green1,
            tabBarInactiveTintColor: colors.green2,
            tabBarLabel: 'Personajes',
          }}
        />
        <Tab.Screen
          name="CartNavigator"
          component={CartNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="shoppingcart" size={30} color={focused ? colors.green1 : colors.green3} />
            ),
            tabBarActiveBackgroundColor: colors.gray1,
            tabBarInactiveBackgroundColor: colors.gray2,
            tabBarActiveTintColor: colors.green1,
            tabBarInactiveTintColor: colors.green2,
            tabBarLabel: 'Carrito',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderColor: colors.gray3
  },
});
