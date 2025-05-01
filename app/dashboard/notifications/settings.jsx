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
          <Text className="text-[#1E1E1E] text-[18px] font-bold my-3">
            Set how you get notified
          </Text>
          <Text className="text-[#1E1E1E] text-[16px] font-medium mb-10">
            Select the most convenient way to notify you of updates, messages,
            and warnings
          </Text>
          <View>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/personalDetails")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="information-circle-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Info and Updates</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="card-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">
                  Financial Activity
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">
                  non-Financial Activity
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="lock-closed-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
