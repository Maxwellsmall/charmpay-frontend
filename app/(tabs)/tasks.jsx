import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TasksView from "@/components/TasksView";

export default function Page() {
  const [toggle, setToggle] = useState(true);

  return (
    <View className=" flex-1 self-center w-[90%] justify-center items-center">
      <TextInput
        className="px-4 py-5 mb-5 placeholderTextColor-[#F5F5F5] bg-white w-[100%] rounded-full"
        placeholder="Search"
      />
      <View className="w-full flex-row justify-center items-center">
        <View className="flex-row items-center py-1 px-1 bg-gray-400 rounded-md">
          {/* Notifications Button */}
          <TouchableOpacity
            className={`px-7 py-1 rounded-md ${
              toggle ? "bg-white" : "bg-gray-400"
            }`}
            onPress={() => setToggle(true)}
          >
            <Text className={toggle ? "text-black" : "text-white"}>
              Task Assigned to me
            </Text>
          </TouchableOpacity>

          {/* Messages Button */}
          <TouchableOpacity
            className={`px-7 py-1 rounded-md ${
              !toggle ? "bg-white" : "bg-gray-400"
            }`}
            onPress={() => setToggle(false)}
          >
            <Text className={!toggle ? "text-black" : "text-white"}>
              Task Assigned By me
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="w-full">
        <Text className="mt-5 font-bold">Recent</Text>
        <TasksView status={"success"} />
        <TasksView status={"success"} />
        <TasksView status={"success"} />
        <TasksView status={"success"} />
      </ScrollView>
    </View>
  );
}
