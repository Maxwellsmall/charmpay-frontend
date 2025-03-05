import { router, Stack } from "expo-router";
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
        />
        <Stack.Screen
          name="auth/signup/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="auth/signup/otp/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="auth/signup/otp/passcode"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="auth/signup/verify/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="auth/signup/verify/success"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="auth/login/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-[#F5F5F5] p-2 rounded-sm">
                  <Ionicons name="user" size={24} color="blue" />
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
