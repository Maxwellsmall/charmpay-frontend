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
          <View className="border-b-2 border-gray-200">
            <View className="flex-row py-4 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Device Name:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Iphone 16 pro max</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">IP Address:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">12.345:654.345</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Location:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Lagos, Nigeria</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Last Active:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">17 hours ago</Text>
              </View>
            </View>
          </View>
          <View className="border-b-2 border-gray-200 mt-8">
            <View className="flex-row py-4 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Device Name:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Iphone 16 pro max</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">IP Address:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">12.345:654.345</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Location:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Lagos, Nigeria</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Last Active:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">17 hours ago</Text>
              </View>
            </View>
          </View>
          <View className="border-b-2 border-gray-200 mt-8">
            <View className="flex-row py-4 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Device Name:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Iphone 16 pro max</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">IP Address:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">12.345:654.345</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Location:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">Lagos, Nigeria</Text>
              </View>
            </View>
            <View className="flex-row py-3 items-center justify-between ">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-slate-400">Last Active:</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-[20px] font-bold">17 hours ago</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="bg-blue-900 w-96 mt-8 py-4 rounded-lg self-center">
            <Text className="text-white text-center font-semibold">
              Logout of other devices
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
