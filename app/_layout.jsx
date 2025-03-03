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
          name="auth/signup"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity>
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/signup2"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-[#F5F5F5] p-2 rounded-sm">
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/passcode"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-[#F5F5F5] p-2 rounded-sm">
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/passcode2"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity
                  className="bg-[#F5F5F5] p-2 rounded-sm"
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/verify"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="auth/verify2"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-[#F5F5F5] p-2 rounded-sm">
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className="bg-[#F5F5F5] p-2 rounded-sm">
                  <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-[#A8A8A8]">BACK</Text>
              </View>
            ),
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
