import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";

export default function Page() {
  return (
    <View className="p-16 items-center flex-1 bg-[#F2F2F2]">
      <View className="justify-center items-center">
        <View className="bg-white mt-10 w-96 p-10 rounded-xl elevation-lg shadow-slate-950">
          <View className="flex flex-col gap-6">
            <View className="flex-row">
              <Text className="text-black text-lg">Account Number</Text>
              <View className="ml-14">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black ml-20">7068383089</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-black text-lg">Account Tier</Text>
              <View className="ml-32 flex-row items-center">
                <Text className="">Tier 1</Text>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center bg-blue-900 w-20 p-2 justify-center rounded-lg"
                >
                  <Text className="text-white font-semibold">Upgrade</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
