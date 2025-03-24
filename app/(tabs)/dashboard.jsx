import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Inbox from "@/components/Inbox";
import Task from "@/components/Task";
import Transactions from "@/components/Transactions";
import useApi from "@/hooks/useApi";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { getProfile } = useApi;
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      const response = await getProfile(setLoading);
      setUserData(response);
    };
    handleFetch();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }

  const TransactionCard = ({ status }) => {
    return (
      <View className="border-[#D9D9D9] border-[1px] p-4 my-[10px] rounded-[10px]">
        <View className="flex-row items-center justify-between">
          <Text className="text-[14px] font-bold">
            Transfer to CHUKWUCHEBEM ESTHER
          </Text>
          <Text className="text-[14px] font-bold">+NGN 50,000</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-[12px]">Feb 27th, 01:48:19</Text>
          <View className="bg-green-200 p-1 rounded-[10px]">
            <Text className="text-[12px] text-green-700">{status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-5">
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
          onPress={() => router.navigate("/dashboard/notifications/")}
        >
          <Ionicons name="notifications-outline" size={30} />
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

          <View className="flex-row items-center justify-between mt-[15px]">
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
        <View className="mt-[20px]">
          <View className="flex-row items-center justify-between">
            <Text className="text-[20px] font-semibold">Transactions</Text>
            <Text className="text-[16px] text-blue-500">See all</Text>
          </View>
          <TransactionCard status="Successs" />
          <TransactionCard status="Successs" />
          <TransactionCard status="Successs" />
          <TransactionCard status="Successs" />
          {/* {Array(5).map((item, index) => (
          ))} */}
        </View>
      </ScrollView>
    </View>
  );
}
