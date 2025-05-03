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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
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
                  Funds Deposited / Withheld
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("notification", "toggle is off");
                    setToggle(!toggle);
                  }}
                >
                  <MaterialIcons name="toggle-on" size={30} color={"blue"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => {
                  setToggle(!toggle)
                  Alert.alert("notification", "toggle is on");
                  }}>
                  <MaterialIcons name="toggle-off" size={30} color={"grey"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Escrow Fund Released
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
                  Milestone Payment Confirmed
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
                  Withdrawal Initiated / Completed
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
                <Text className="text-[15px] font-bold">Refund Processed</Text>
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
