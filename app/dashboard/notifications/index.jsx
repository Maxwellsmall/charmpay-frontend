import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications() {
  const [toggle, setToggle] = useState(true);

  const Notification = () => {
    return (
      <View className="flex-row mt-3 border-b-hairline p-3 w-[90%] items-start self-center">
        <View className="bg-[#f5f5f5] w-10 h-10 self-center justify-center items-center mr-2 rounded-full">
          <Ionicons name="person-outline" />
        </View>
        <View className="w-[90%] ml-5">
          <Text numberOfLines={1} className="text-lg font-bold">
            Personal Details
          </Text>
          <Text numberOfLines={4}>
            You Have Only 2 days left to complete your task and earn.
          </Text>
          <Text numberOfLines={4}>2hrs</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="px-3 flex-1 items-center">
      <View className="w-full flex-row justify-center items-center">
        <View className="flex-row items-center py-1 px-1 bg-gray-400 rounded-md">
          {/* Notifications Button */}
          <TouchableOpacity
            className={`px-7 py-1 rounded-md ${
              toggle ? "bg-white" : "bg-gray-400"
            }`}
            onPress={() => setToggle(true)}
          >
            <Text className={toggle ? "text-black" : "text-white"}>
              Notifications
            </Text>
          </TouchableOpacity>

          {/* Messages Button */}
          <TouchableOpacity
            className={`px-7 py-1 rounded-md ${
              !toggle ? "bg-white" : "bg-gray-400"
            }`}
            onPress={() => setToggle(false)}
          >
            <Text className={!toggle ? "text-black" : "text-white"}>
              Messages
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </ScrollView>
    </View>
  );
}
