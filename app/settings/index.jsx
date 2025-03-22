import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";

export default function settings() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 mt-[20px]">
          <Text className="text-[#1E1E1E] text-[16px] font-medium">
            Account
          </Text>
          <View className="">
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="person-outline" size={24} />
                </View>
                <Text className="text-[20px]">Personal Details</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="link-outline" size={24} />
                </View>
                <Text className="text-[20px]">Linked Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-5 mt-[20px]">
          <Text className="text-[#1E1E1E] text-[16px] font-medium">
            General
          </Text>
          <View className="">
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="notifications-outline" size={24} />
                </View>

                <Text className="text-[20px]">Notification</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="contrast-outline" size={24} />
                </View>
                <Text className="text-[20px]">Appearance</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center border-b-2 border-gray-200">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="book-outline" size={24} />
              </View>
              <Text className="text-[20px]">Licence</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center border-b-2 border-gray-200">
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
