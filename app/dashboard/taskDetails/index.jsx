import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Page() {
  return (
    <View className="flex-1 px-5 items-center">
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Title</Text>
        <Text className="font-semibold">Fix th dog's cage</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Description</Text>
        <Text className="font-semibold w-28">
          {" "}
          The door and the roof the has damaged and need to be wielded back.{" "}
        </Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Assigned To</Text>
        <Text className="font-semibold w-32"> Edufunke Maxwell</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Date Assigned</Text>
        <Text className="font-semibold w-32"> 5th of Match, 2025</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Amount</Text>
        <Text className="font-semibold w-32"> NGN 50,000</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Payment Method</Text>
        <Text className="font-semibold w-32"> Escro payment</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Transactio Id</Text>
        <Text className="font-semibold w-32"> 756xx5gxxd567kkio9cxx35</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Status</Text>
        <Text className="font-semibold w-32"> Completed</Text>
      </View>
      <View className="w-[80%] flex-row justify-between px-20 items-center self-center mt-5">
        <TouchableOpacity className="px-5 py-3 rounded-full bg-blue-900">
          <Text className="text-white">Share Recipt</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 rounded-full bg-white border-[1px]">
          <Text className="text-black">Dispute</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
