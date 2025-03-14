import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, Image, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={20} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Your Tasks",
          tabBarIcon: () => <Ionicons name="home" size={20} />
        }}
      />
    </Tabs>
  );
}
