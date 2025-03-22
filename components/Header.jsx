import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header({ title, isModal, setIsVisible }) {
  return (
    <View className="flex-row py-3 px-5">
      <TouchableOpacity
        onPress={isModal ? () => setIsVisible(false) : () => router.back()}
        className="bg-[#f5f5f5] p-2 rounded-full"
      >
        <Ionicons name={isModal ? "close" : "chevron-back"} size={24} />
      </TouchableOpacity>
      <View className="ms-auto me-auto items-center justify-center">
        <Text className="text-center text-[20px] font-bold">{title}</Text>
      </View>
    </View>
  );
}
