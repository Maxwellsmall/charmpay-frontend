import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useApi from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useLocalSearchParams();

  const { getTaskById } = useApi;

  useEffect(() => {
    console.log(taskId);
    const fetchTask = async () => {
      let response = await getTaskById(taskId, setLoading);
      setTask(response);
    };
    fetchTask();
  }, []);
  return loading ? (
    <View className="flex-1 w-full justify-center items-center">
      <ActivityIndicator size={30} />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 px-5 items-center">
        <Text className="text-[14px] text-black text-left w-full my-10">
          Task Details
        </Text>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Title</Text>
          <Text className="font-semibold w-52">{task.title}</Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Assigned By</Text>
          <Text className="font-semibold w-52">
            {task.assigner.firstName} {task.assigner.lastName}
          </Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Assigned To</Text>
          <Text className="font-semibold w-52">
            {task.assignee.firstName} {task.assignee.lastName}
          </Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Date Assigned</Text>
          <Text className="font-semibold w-52">{Date(task.createdAt)}</Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Amount</Text>
          <Text className="font-semibold w-52">
            NGN {task.transaction.amount}
          </Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Payment Method</Text>
          <Text className="font-semibold w-52"> Escrow payment</Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Transaction Id</Text>
          <Text className="font-semibold w-52">
            {task.transaction.id.substring(0, 15)}XXXXXXXs
            {task.transaction.id.substring(20)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Status</Text>
          <Text className="font-semibold w-52"> {task.status}</Text>
        </View>
        <View className="flex-row justify-between items-end w-full mb-5">
          <Text className="text-[14px] text-neutral-400">Description</Text>
          <Text className="font-semibold w-52 text-right">
            {task.description}
          </Text>
        </View>
        <View className="w-96 flex-row justify-between px-2 items-center self-center mt-auto mb-4">
          <TouchableOpacity
            className="px-5 py-3 rounded-full bg-white border-[1px]"
            onPress={() => router.navigate(`/tasks/disputes/${task.id}`)}
          >
            <Text className="text-black">Dispute</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-5 py-3 rounded-full bg-blue-900">
            <Text className="text-white">Share Recipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
