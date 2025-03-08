import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
      <View className="m-20 border-2 border-sky-950 p-10 w-96 rounded">
        <View className="flex-row w-96 items-center justify-between ">
          <View className="flex-row items-center  justify-between">
            <Ionicons name="shield-checkmark" size={24} color={"#301B92"} />
            <Text>Available balance</Text>
            <TouchableOpacity>
              <Ionicons name="eye-sharp" size={24} color={"#301B92"} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between">
            <Text>Transaction History</Text>
            <Ionicons name="chevron-forward" size={24} color={"black"} />
          </View>
        </View>
        <View className="flex-row w-96 items-center mt-10 justify-between ">
          <View className="flex-row items-center  justify-between">
            <Ionicons name="shield-checkmark" size={24} color={"#301B92"} />
            <Text>Available balance</Text>
            <TouchableOpacity>
              <Ionicons name="eye-sharp" size={24} color={"#301B92"} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between">
            <Text>Transaction History</Text>
            <Ionicons name="chevron-forward" size={24} color={"black"} />
          </View>
        </View>
      </View>
    </View>
  );
}
