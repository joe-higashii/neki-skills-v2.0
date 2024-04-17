import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <DataProvider>
          <StackRoutes />
        </DataProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
