import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Page() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 mt-[20px]">
          <View>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="wallet-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Currency:Dollars</Text>
              </View>
              <Ionicons name="chevron-down" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="thermometer-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Payment Threshold</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">
                  Auto-Release Rules
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="apps-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">
                  Transaction Fees Display
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
