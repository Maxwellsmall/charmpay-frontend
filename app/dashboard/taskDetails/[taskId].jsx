import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import useApi from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { taskId } = useLocalSearchParams();
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);

  const { getTaskById } = useApi;

  useEffect(() => {
    const fetchTask = async () => {
      let response = await getTaskById(taskId, setLoading);
      setTask(response);
      console.log(taskId);
    };
    fetchTask();
  }, []);

  // Status dropdown
  const [status, setStatus] = useState("Completed");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // A sample, multiline description

  const statusOptions = ["Completed", "Ongoing", "Canceled"];

  // A sample array of activity logs or notes
  const activityLogs = [
    { id: 1, text: "Status changed to Ongoing on Mar 2" },
    { id: 2, text: "Assigned to John Doe on Feb 15" },
    { id: 3, text: "Due date updated to Feb 20" },
  ];

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Top Container */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Header / Task Title */}
        <View className="p-2">
          {/* Divider / Tabs */}
          <View className=" px-4 w-full flex-row justify-center items-center">
            <View className="flex-row py-1 px-1 border-gray-200 border-b-[1px] rounded-md w-96 justify-center items-center">
              {/* Details Button */}
              <TouchableOpacity
                className={`w-[40%] py-1 rounded-md justify-center items-center ${
                  toggle ? "bg-gray-400" : "bg-white"
                }`}
                onPress={() => setToggle(true)}
              >
                <Text className={toggle ? "text-white" : "text-black"}>
                  Details
                </Text>
              </TouchableOpacity>

              {/* Activity Button */}
              <TouchableOpacity
                className={`w-[40%] py-1 rounded-md justify-center items-center ${
                  !toggle ? "bg-gray-400" : "bg-white"
                }`}
                onPress={() => setToggle(false)}
              >
                <Text className={!toggle ? "text-white" : "text-black"}>
                  Activity
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Details or Activity Content */}
          {toggle ? (
            /* DETAILS VIEW */
            <View className="px-4 py-4">
              <Text className="text-xl font-bold mb-4 capitalize">
                {task?.title}
              </Text>
              <View className="flex-row justify-between py-4 border-b border-gray-300">
                <View className="flex-row items-center">
                  <Ionicons name="checkbox-outline" size={20} />
                  <View className="ml-2">
                    <Text className="text-gray-500">Status</Text>
                    <Text className=" text-black font-bold capitalize">
                      {task?.status}
                    </Text>
                  </View>
                </View>

                <View className="relative w-44">
                  {/* Current Status Button */}
                  <Pressable
                    onPress={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex-row justify-between items-center px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <Text className="text-base text-gray-700">
                      {task?.status}
                    </Text>
                    <Text className="text-gray-700">
                      {showStatusDropdown ? "▲" : "▼"}
                    </Text>
                  </Pressable>

                  {/* Status Dropdown Options */}
                  {/* {showStatusDropdown && (
                    <View className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md z-10">
                      {statusOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => {
                            setStatus(option);
                            setShowStatusDropdown(false);
                          }}
                          className="px-3 py-2 hover:bg-gray-100"
                        >
                          <Text
                            className={`text-base ${
                              status === option ? "font-bold" : "font-normal"
                            }`}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )} */}
                </View>
              </View>
              <View className="flex-row justify-between py-4 border-b border-gray-300">
                <View className="flex-row items-center">
                  <Ionicons name="person-circle" size={20} />
                  <View className="ml-2">
                    <Text className="text-gray-500">Assignee</Text>
                    {taskId == task?.assignerId ? (
                      <Text className="text-black font-bold capitalize">
                        {task?.assigner.firstName} {task?.assigner.lastName}
                      </Text>
                    ) : (
                      <Text className="text-black font-bold capitalize">
                        {task?.assignee.firstName} {task?.assignee.lastName}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {/* <View className="flex-row justify-between py-4 mb-4 border-b border-gray-300">
                <View className="flex-row items-center">
                  <Ionicons name="calendar" size={20} />
                  <View className="ml-2">
                    <Text className="text-gray-500">Due Date</Text>
                    <Text className=" text-black font-bold capitalize">
                      FEB 15
                    </Text>
                  </View>
                </View>
              </View> */}

              <Text className="text-lg font-semibold mb-2">Description</Text>
              <View className="h-40 text-base text-gray-800 border border-gray-300 rounded-md p-2">
                <Text>{task.description}</Text>
              </View>

              {taskId == task?.assignerId ? (
                <TouchableOpacity className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center mt-5">
                  {loading && <ActivityIndicator size={24} color={"white"} />}
                  <Text className="text-white text-center font-semibold ml-2">
                    APPROVE
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center mt-5">
                  {loading && <ActivityIndicator size={24} color={"white"} />}
                  <Text className="text-white text-center font-semibold ml-2">
                    DISAPPROVE
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            /* ACTIVITY VIEW */
            <View className="px-4 py-4">
              <Text className="text-lg font-semibold mb-2">Activity</Text>
              {activityLogs.map((log) => (
                <View key={log.id} className="mb-2">
                  <Text className="text-base text-gray-700">• {log.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Status and Dropdown */}
      </ScrollView>
    </View>
  );
}
