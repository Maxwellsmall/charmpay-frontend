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
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">FAQs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Contact Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Tutorials</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Feedback</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
