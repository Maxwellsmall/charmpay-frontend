import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Inbox({ task }) {
  const router = useRouter();
  console.log("item", task);

  return (
    <TouchableOpacity
      className="border-[#D9D9D9] border-b-[1px] p-4 my-[10px] rounded-[10px] w-full"
      onPress={() => router.navigate(`/dashboard/taskDetails/${task.id}`)}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-bold">{task.title}</Text>
        <Text className="text-[14px] font-bold">
          +NGN {task.transaction.amount}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[12px]">
          {Date(task.createdAt).split("G")[0]}
        </Text>
        <View className="bg-green-200 p-1 rounded-[10px]">
          <Text className="text-[12px] text-green-700">{task.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
