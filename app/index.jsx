import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import useApi from "@/hooks/useApi";

export default function Page() {
  const { In_local_notification } = useApi();
  let { isLoading, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const notificationUtils = In_local_notification();

    // Request permission and then schedule the notification
    const runNotifications = async () => {
      const permissionGranted =
        await notificationUtils.requestNotificationsPermissions();
      if (permissionGranted) {
        await notificationUtils.schedulePushNotification(
          "Charmpay",
          "Welcome to charmpay. Your Best Escrow Payment App."
        );
      }
    };

    runNotifications();
  }, []);

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
