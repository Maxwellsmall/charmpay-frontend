import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DisputeTransaction({ disputes }) {
  return (
    <TouchableOpacity
      className="border-[#D9D9D9] border-b-[1px] p-4 my-[10px] rounded-[10px]"
      onPress={() => router.navigate(`/tasks/disputes/${disputes.id}`)}
    >
      <View className="flex-row w-100 items-center">
        <Ionicons
          name="alert-circle"
          className="mr-2"
          size={25}
          color={"#9ca3af"}
        />
        <View className="w-96">
          <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-bold">Dispute Raised</Text>
            <Text className="text-[14px] font-bold w-52" numberOfLines={1}>
              {disputes.raiserEvidence.text}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-[12px]">
              {Date(disputes.updatedAt).split("G")[0]}
            </Text>
            {/* <View className="bg-green-200 p-1 rounded-[10px]">
          <Text className="text-[12px] text-purple-700">blue</Text>
        </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
