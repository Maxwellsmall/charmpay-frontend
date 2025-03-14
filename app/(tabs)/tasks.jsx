import { View, Text } from "react-native";
import React from "react";
import TaskView from "../../components/TasksView";
export default function Page() {
  return (
    <View className="flex-1 items-center w-full">
      <View className="mt-4 p-5 bg-white w-[90%] rounded-lg">
        <TaskView />
        <TaskView />
        <TaskView />
        <TaskView />
        <TaskView />
        <TaskView />
        <TaskView />
      </View>
    </View>
  );
}
