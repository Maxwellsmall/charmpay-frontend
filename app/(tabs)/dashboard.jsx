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
import { useState, useEffect, useCallback, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SMS from "expo-sms";
import Inbox from "@/components/Inbox";
import Task from "@/components/Task";
import Transactions from "@/components/Transactions";
import useApi from "@/hooks/useApi";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/AuthProvider";
import Skeleton from "@/components/Skelectons/Skelecton";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { getProfile, getAllTransactions } = useApi();
  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { userData, setUserData, isLoading, setIsLoading } =
    useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const handleFetch = async () => {
    setRefreshing(true);
    const userDetails = await getProfile(setIsLoading);
    const userTransactions = await getAllTransactions(setLoading);
    setUserData(userDetails);
    setTransactions(userTransactions);
    setRefreshing(false);
    setIsLoading(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = useCallback(() => {
    handleFetch();
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [""], // Phone number(s) as an array
        "This is an Invitation to download the charmpay app." // Your message
      );
      console.log("SMS Result:", result); // result = 'sent' | 'cancelled'
    } else {
      alert("SMS is not available on this device");
    }
  };

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView
        className=" bg-white"
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className=" mx-5 mt-2">
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
              {showBalance
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: userData?.wallet?.currency || "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(userData?.wallet?.currentBalance)
                : "****"}
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
              <TouchableOpacity
                className="bg-blue-900 p-2 rounded-[25px]"
                onPress={() => router.navigate("/funding/withdraw")}
              >
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
            style={{
              width: "90%",
              borderRadius: 20,
              marginTop: 20,
              alignSelf: "center",
              paddingVertical: 20,
              paddingHorizontal: 28,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text className="text-white text-[20px]">Invite a friend and</Text>
            <Text className="text-white text-[20px]">earn cash back</Text>
            <TouchableOpacity onPress={sendSMS}>
              <Text className="text-[16px] text-yellow-600">
                Invite friends
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View className="mt-[20px]">
            <View className="flex-row items-center justify-between">
              <Text className="text-[20px] font-semibold">Transactions</Text>
              <TouchableOpacity
                onPress={() =>
                  router.navigate("/dashboard/transactions/history")
                }
              >
                <Text className="text-[16px] text-blue-500">See all</Text>
              </TouchableOpacity>
            </View>
            {!transactions ? (
              <View className="mt-[10px]">
                <Text className="text-center text-[16px]">
                  No transactions yet.
                </Text>
              </View>
            ) : (
              transactions
                ?.reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <Transactions key={index} transaction={item} />
                ))
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full items-center justify-center bg-[#301B92]"
        onPress={() => router.navigate("/funding/transfer")}
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        <Ionicons
          name="send"
          size={28}
          color="white"
          style={{
            transform: [{ rotate: "-45deg" }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
