import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  return (
    <View className="flex-1 px-5 items-center">
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Title</Text>
        <Text className="font-semibold">Fix the dog's cage</Text>
      </View>
      <View className="flex-row justify-between items-end w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Description</Text>
        <Text className="font-semibold w-52 text-right">
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
        <Text className="font-semibold w-32"> Escrow payment</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Transaction Id</Text>
        <Text className="font-semibold w-32"> 756xx5gxxd567kkio9cxx35</Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="text-[14px] text-neutral-400">Status</Text>
        <Text className="font-semibold w-32"> Completed</Text>
      </View>
      <View className="w-96 flex-row justify-between px-2 items-center self-center mt-5">
        <TouchableOpacity
          className="px-5 py-3 rounded-full bg-white border-[1px]"
          onPress={() => router.navigate("/tasks/disputes/")}
        >
          <Text className="text-black">Dispute</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 rounded-full bg-blue-900">
          <Text className="text-white">Share Recipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
