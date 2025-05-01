import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import TasksView from "@/components/TasksView";
import useApi from "@/hooks/Api";

export default function Page() {
  const [toggle, setToggle] = useState(true);
  const { getMyTask, getOthersTask, searchTask } = useApi;
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [tasks, setTasks] = useState([]);

  const handleFetch = async () => {
    const response = await getMyTask(setLoading);
    setTasks(response);
  };

  const handleFetchOthers = async () => {
    const response = await getOthersTask(setLoading);
    setTasks(response);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = useCallback(() => {
    handleFetch();
    handleFetchOthers();
  }, []);

  const handleSearch = async (text) => {
    setTask(text);
    if (text.trim() === "") {
      setTasks(null);
      setErrorMessage("");
      return;
    }
    const result = await searchTask(
      text,
      setLoading,
      setTasks,
      setErrorMessage
    );
    console.log(result);
    if (result) {
      setTasks(result);
      setErrorMessage("");
    } else {
      setTasks(null);
      setErrorMessage("Task not found.");
    }
    setLoading(false);
  };

  return (
    <View className=" flex-1 self-center w-[90%] items-center">
      <TextInput
        className="px-4 py-3 mb-5 placeholderTextColor-[#F5F5F5] bg-white w-[100%] rounded-full"
        placeholder="Search"
        returnKeyType="search"
        value={task}
        onChangeText={handleSearch}
      />
      <View className="w-full flex-row justify-center items-center">
        <View className="flex-row items-center py-1 px-1 bg-gray-400 rounded-md">
          {/* Notifications Button */}
          <TouchableOpacity
            className={`px-7 py-1 rounded-md ${
              toggle ? "bg-white" : "bg-gray-400"
            }`}
            onPress={() => {
              setToggle(true);
              setTask("");
              handleFetch();
            }}
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
            onPress={() => {
              setToggle(false);
              setTask("");
              handleFetchOthers();
            }}
          >
            <Text className={!toggle ? "text-black" : "text-white"}>
              Task Assigned By me
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View className="flex-1 w-full justify-center items-center">
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <View className="w-full">
          <FlatList
            data={tasks}
            renderItem={({ item }) => <TasksView task={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text className="mt-6 text-center">No Tasks found</Text>
            }
          />
        </View>
      )}
    </View>
  );
}
