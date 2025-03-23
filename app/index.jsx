import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function Page() {
  let { isLoading, isAuthenticated } = useContext(AuthContext);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View>
          <Image source={require("../assets/images/logo.png")} />
          <Text className="text-center font-bold mt-5 text-lg text-blue-900">
            CHARMPAY
          </Text>
        </View>
      </View>
    );

  if (isAuthenticated) return <Redirect href="/dashboard" />;

  return <Redirect href="/screens/firstBoard" />;
}
