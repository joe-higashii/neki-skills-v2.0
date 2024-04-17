import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home as HomeIcon, List, UserCircle2 } from "@tamagui/lucide-icons";
import { Home, MySkills, Profile, SearchPage } from "../pages/Index";

type TabNavigation = {
  Home: undefined;
  MySkills: undefined;
  Profile: undefined;
};

export type TabTypes = BottomTabNavigationProp<TabNavigation>;
export default function TabRoutes() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        title: "NekiSkills",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
          tabBarLabel: "Inicio",
        }}
      />

      <Tab.Screen
        name="MySkills"
        component={MySkills}
        options={{
          tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
          tabBarLabel: "Minhas Skills",
          title: "Minhas Skills",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserCircle2 color={color} size={size} />
          ),
          tabBarLabel: "Meu Perfil",
          title: "Meu Perfil",
        }}
      />
    </Tab.Navigator>
  );
}
