import React from "react";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#BEDE61",
        tabBarInactiveTintColor: "#787878",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="edit" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
