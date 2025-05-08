import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function Page() {
  const [toggle, setToggle] = useState(false);
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
                <Text className="text-[15px] font-bold">
                  Auto Release After Task Completion:
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Notify Before Release
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 p-[5px] border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Auto-Release If No Dispute Is Raised
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="toggle-on" size={30} color={"blue"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="toggle-off" size={30} color={"blue"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="document-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Allow Tasker To Extend Auto-Release window
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="toggle-on" size={30} color={"blue"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="toggle-off" size={30} color={"blue"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
