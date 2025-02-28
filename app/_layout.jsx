import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "react-native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <Image
                  source={require("../assets/images/logo.png")}
                  className="w-12 h-12 mr-3"
                />
                <Text className="font-bold">Charmpay</Text>
              </View>
            ),
          }}
        /
        <Stack.Screen
          name="auth/signup"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-black rounded-lg">
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
}
9;
