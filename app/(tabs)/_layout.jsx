import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, Image, Text, View } from "react-native";
import Header from "@/components/Header";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import HeaderSkeleton from "@/components/Skelectons/HeaderSkelecton";

export default function TabLayout() {
  const router = useRouter();
  const { userData, setUserData, isLoading } = useContext(AuthContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingHorizontal: 20, height: 60 },
        tabBarActiveTintColor: "#301B92",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "  Home",
          headerShown: true,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} />
          ),
          contentStyle: {
            backgroundColor: "white",
          },
          header: () =>
            isLoading ? (
              <HeaderSkeleton />
            ) : (
              <View className="flex-row justify-between items-center px-5 py-3 bg-white">
                <TouchableOpacity
                  className="flex-row justify-normal items-center"
                  onPress={() => router.navigate("/profile")}
                >
                  {userData?.avatar ? (
                    <Image
                      source={profileImage}
                      className="rounded-full w-[40px] h-[40px]"
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name="person-circle" size={40} />
                  )}
                  <View className="ml-3">
                    <Text className="font-bold">
                      HI, {userData?.firstName} {userData?.lastName}
                    </Text>
                    <Text className="text-[#616060] font-semibold text-[10px]">
                      {getGreeting()}
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
          header: () => <Header title="Task" isTasks={true} />,
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
