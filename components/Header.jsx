import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthProvider";
import useApi from "@/hooks/Api";

export default function Header({
  title,
  isModal,
  setIsVisible,
  isNotification,
  isTasks,
}) {
  const { setIsLoading, isFunding, setIsFunding, referenceId } =
    useContext(AuthContext);

  return (
    <View className="flex-row py-3 px-5">
      {!isFunding && (
        <TouchableOpacity
          onPress={isModal ? () => setIsVisible(false) : () => router.back()}
          className="bg-[#f5f5f5] p-2 rounded-full"
        >
          <Ionicons name={isModal ? "close" : "chevron-back"} size={24} />
        </TouchableOpacity>
      )}
      <View className="ms-auto me-auto items-center justify-center">
        <Text className="text-center text-[20px] font-bold">{title}</Text>
      </View>
      {isNotification && (
        <TouchableOpacity
          onPress={() => router.navigate("/dashboard/notifications/settings")}
          className="bg-[#f5f5f5] p-2 rounded-full"
        >
          <Ionicons name={"settings-outline"} size={24} />
        </TouchableOpacity>
      )}
      {isFunding && (
        <TouchableOpacity
          className="bg-[#f5f5f5] p-2 rounded-full"
          onPress={() => {
            router.dismissTo("/(tabs)/dashboard");
            setIsFunding(false);
          }}
        >
          <Ionicons name={"close"} size={24} />
        </TouchableOpacity>
      )}
      {isTasks && (
        <TouchableOpacity
          className="bg-white w-10 h-10 justify-center items-center rounded-full"
          onPress={() => {
            router.navigate("/tasks/create");
            setIsFunding(false);
          }}
        >
          <FontAwesome6 name={"plus"} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}
