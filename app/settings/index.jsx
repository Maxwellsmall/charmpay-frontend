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
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/personalDetails")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="person-outline" size={24} />
                </View>
                <Text className="text-[20px]">Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/deposit")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="wallet-outline" size={24} />
                </View>
                <Text className="text-[20px]">Payment</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() =>
                router.navigate("/dashboard/notifications/settings")
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="notifications-outline" size={24} />
                </View>
                <Text className="text-[20px]">Notification</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/privacy")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="lock-closed-outline" size={24} />
                </View>
                <Text className="text-[20px]">Security & Privacy</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/legal")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[20px]">Legal & Compliance</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/preference")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="apps-outline" size={24} />
                </View>
                <Text className="text-[20px]">App Preference</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => router.navigate("/settings/support")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="file-outline" size={24} />
                </View>
                <Text className="text-[20px]">Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row py-3 items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="information-circle-outline" size={24} />
              </View>
              <Text className="text-[20px]">About Charmpay</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-center mt-10 font-bold text-[#1e1e1eaf]">
          Version 2.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
