import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import History from "@/components/History";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          width: "100%", // Makes content full width
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <View className="w-full p-2 border-b-2">
          <View className="flex-row items-center">
            <View className="flex-row items-center">
              <Text className="text-[12px] font-bold ml-2">January</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-down" size={24} color={"#301B92"} />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[12px] font-bold ml-44">
                IN: 50,000 OUT: 25,000
              </Text>
            </View>
          </View>
        </View>
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
      </ScrollView>
    </View>
  );
}
