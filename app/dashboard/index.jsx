import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          width: "100%", // Makes content full width
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <View className="w-full px-5 ">
          <View className="border-4 border-[#C4BEE1] p-5 rounded-lg">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={24} color={"#301B92"} />
                <Text className="text-[12px] font-semibold ml-2">
                  Available balance
                </Text>
                <TouchableOpacity>
                  <Ionicons name="eye-sharp" size={24} color={"#301B92"} />
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[12px] font-semibold">
                  Transaction History
                </Text>
                <Ionicons name="chevron-forward" size={24} color={"black"} />
              </View>
            </View>
            <View className="flex-row items-center mt-10 justify-between">
              <Text className="text-[12px] font-semibold">C$200,000</Text>
              <TouchableOpacity className="bg-blue-700 rounded-full p-2 px-3">
                <Text className="text-white text-[12px] font-semibold">
                  Add money
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
