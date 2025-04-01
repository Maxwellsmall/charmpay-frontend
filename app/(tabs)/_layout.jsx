import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, Image, Text, View } from "react-native";
import Header from "@/components/Header";
import { AuthContext } from "@/context/AuthProvider";

export default function TabLayout() {
  const { userData, setUserData } = useContext(AuthContext);
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "",
          headerShown: true,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} />
          ),
          contentStyle: {
            backgroundColor: "white",
          },
          header: () => (
            <View className="flex-row justify-between items-center px-5 py-3 bg-white">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => router.navigate("/profile")}
              >
                <Image
                  source={require("../../assets/images/OIP.png")}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    HI, {userData?.firstName} {userData?.lastName}
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    Good morning!
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#f5f5f5] p-2 rounded-full"
                onPress={() => router.navigate("/dashboard/notifications/")}
              >
                <Ionicons name="notifications-outline" size={23} />
              </TouchableOpacity>
            </View>
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
