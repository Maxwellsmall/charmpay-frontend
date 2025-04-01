import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function User({ recipient, setIsModalVisible, setId }) {
  setId(recipient.id);
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        className="flex-row justify-normal items-center"
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={require("@/assets/images/OIP.png")}
          className="rounded-full w-[40px]"
        />
        <View className="ml-3">
          <Text className="text-bold font-bold">
            {recipient?.firstName} {recipient?.lastName}
          </Text>
          <Text className="text-[#616060] font-semibold text-[10px]">
            {recipient?.email}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} />
      </TouchableOpacity>
    </View>
  );
}
