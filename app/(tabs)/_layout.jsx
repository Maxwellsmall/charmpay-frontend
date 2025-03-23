import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, Image, Text } from "react-native";
import Header from "@/components/Header";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          header: () => <Header title="Task" />,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "checkbox" : "checkbox-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          sceneStyle: {
            backgroundColor: "white",
          },
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
