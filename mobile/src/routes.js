import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "Dev Finder",
          headerStyle: { backgroundColor: "#7159c1" },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Perfil do Github" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
