import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Inbox from "@/components/Inbox";
import Task from "@/components/Task";
import Transactions from "@/components/Transactions";
import useApi from "@/hooks/useApi";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { getProfile } = useApi;
  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);

    const response = await getProfile(setLoading);
    setUserData(response);
    setRefreshing(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = useCallback(() => {
    handleFetch();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-row justify-between items-center px-5 mt-3">
        <TouchableOpacity
          className="flex-row justify-normal items-center"
          onPress={() => router.navigate("/profile")}
        >
          <Image
            source={require("../../assets/images/OIP.png")}
            className="rounded-full w-[40px]"
          />
          <View className="ml-3">
            <Text className="text-bold font-bold">
              HI, {userData?.firstName} {userData?.lastName}
            </Text>
            <Text className="text-[#616060] font-semibold text-[10px]">
              Good morning!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#f5f5f5] p-2 rounded-full"
          onPress={() => router.navigate("/dashboard/notifications/")}
        >
          <Ionicons name="notifications-outline" size={23} />
        </TouchableOpacity>
      </View>
      <ScrollView className="mx-5 mt-[25px]">
        <View>
          <View className="flex-row items-center">
            <Text className="me-3 text-[16px] font-bold text-[#616060]">
              Total balance
            </Text>
            <TouchableOpacity
              onPress={() => setShowBalance((prev) => !prev)}
              className="p-[5px]"
            >
              <Ionicons name={showBalance ? "eye-off" : "eye"} size={16} />
            </TouchableOpacity>
          </View>
          <Text className="text-[35px] font-bold mt-[10px]">
            NGN {showBalance ? `${userData.wallet.currentBalance}.00` : "****"}
          </Text>

          <View className="flex-row items-center justify-evenly mt-[15px]">
            <TouchableOpacity
              className="bg-blue-900 p-2 rounded-[25px]"
              onPress={() => router.navigate("/tasks/create")}
            >
              <View className="flex-row items-center justify-center">
                <View className="bg-white rounded-full items-center justify-center p-1 me-1">
                  <Ionicons name="add" color={"black"} size={20} />
                </View>
                <Text className="text-white text-[14px] font-semibold">
                  Create Task
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-900 p-2 rounded-[25px]">
              <View className="flex-row items-center justify-center">
                <View className="bg-white rounded-full items-center justify-center p-1 me-1">
                  <Ionicons name="arrow-up" color={"black"} size={20} />
                </View>
                <Text className="text-white text-[14px] font-semibold">
                  Withdraw
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-900 p-2 rounded-[25px] "
              onPress={() => router.navigate("/funding")}
            >
              <View className="flex-row items-center justify-center">
                <View className="bg-white rounded-full items-center justify-center p-1 me-1">
                  <Ionicons name="arrow-down" color={"black"} size={20} />
                </View>
                <Text className="text-white text-[14px] font-semibold">
                  Add money
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={["#5A45FE", "#362998"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-[90%] rounded-3xl mt-10 self-center py-5 px-7 justify-center items-start"
        >
          <Text className="text-white text-[20px]">Invite a friend and</Text>
          <Text className="text-white text-[20px]">earn cash back</Text>

          <Text className="text-[10px] text-yellow-600">Invite friend</Text>
        </LinearGradient>
        <View className="mt-[20px]">
          <View className="flex-row items-center justify-between">
            <Text className="text-[20px] font-semibold">Transactions</Text>
            <TouchableOpacity
              onPress={() => router.navigate("/dashboard/transactions/history")}
            >
              <Text className="text-[16px] text-blue-500">See all</Text>
            </TouchableOpacity>
          </View>
          <Transactions status="success" />
          <Transactions status="success" />
          <Transactions status="success" />
        </View>
      </ScrollView>
    </ScrollView>
  );
}
