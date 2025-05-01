import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

export default function History() {
  return (
    <View>
      <View className=" flex-row justify-between w-96 items-center  px-2 py-4">
        <Text className="font-medium">Transfer to Chuckuchebem David</Text>
        <Text className="font-semibold">N 500,000</Text>
      </View>
      <View className="flex-row justify-between items-center  px-2">
        <Text className="text-xs">Feb 20th, 2025</Text>
        <TouchableWithoutFeedback
          className="P-3"
          style={{ backgroundColor: "#C4BEE1" }}
        >
          <Text style={{ color: "#C4BEE1" }}>pending</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
