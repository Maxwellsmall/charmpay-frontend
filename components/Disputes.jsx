import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

export default function DisputeTransaction({ status }) {
  return (
    <View className="border-[#D9D9D9] border-b-[1px] p-4 my-[10px] rounded-[10px]">
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-bold">Fix the Dog's Cage</Text>
        <Text className="text-[14px] font-bold">+NGN 50,000</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[12px]">Feb 27th, 01:48:19</Text>
        <View className="bg-green-200 p-1 rounded-[10px]">
          <Text className="text-[12px] text-purple-700">{status}</Text>
        </View>
      </View>
    </View>
  );
}
