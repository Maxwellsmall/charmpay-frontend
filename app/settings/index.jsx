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
              // onPress={() => router.navigate("")}
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
              onPress={() => router.navigate("/settings/payment/deposit")}
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
              onPress={() => router.navigate("settings/notices/notification")}
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
              onPress={() => router.navigate("/settings/security/privacy")}
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
              onPress={() => router.navigate("/settings/perfer/preference")}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
