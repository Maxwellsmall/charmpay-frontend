import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

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
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Payment Confirmations
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
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Job Completion Notices
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
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Dispute Escalations
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
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Security Alert(e.g login from another devices)
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
