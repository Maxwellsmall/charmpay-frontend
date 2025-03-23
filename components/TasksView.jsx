import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Inbox({ status }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="border-[#D9D9D9] border-b-[1px] p-4 my-[10px] rounded-[10px] w-full"
      onPress={() => router.navigate("/dashboard/taskDetails/")}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-bold">Laptop Repair</Text>
        <Text className="text-[14px] font-bold">+NGN 50,000</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[12px]">Yeserday, 01:48:19</Text>
        <View className="bg-green-200 p-1 rounded-[10px]">
          <Text className="text-[12px] text-green-700">{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
