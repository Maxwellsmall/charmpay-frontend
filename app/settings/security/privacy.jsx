import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
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
              onPress={() => {
                // router.navigate("settings/security/devi/devices");
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                );
              }}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">Login Devices</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() =>
                // router.navigate("/settings/security/pass/password")
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Password and Email
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() =>
                // router.navigate("/settings/security/applock/index")
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">App Lock</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => {
                // router.navigate("/settings/security/data/index");
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                );
              }}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Data Sharing Preferences
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
