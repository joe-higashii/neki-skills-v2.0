import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authTypes";
import { ArrowLeft } from "@tamagui/lucide-icons";
import TabRoutes from "./tabs.routes";
import { Login, Signup, SearchPage } from "../pages/Index";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  SearchPage: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes() {
  const { getToken: isAuthenticated } = useContext(
    AuthContext
  ) as AuthContextType;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated() ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: !isAuthenticated ? "pop" : "push",
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerLeft: () => (
                <ArrowLeft
                  size={40}
                  color={"#fff"}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="menu-principal" component={TabRoutes} />
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{
              headerShown: true,
              headerTitle: "NekiSkills",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
