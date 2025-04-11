import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthProvider";

export default function Transactions({ transaction }) {
  const { userData, setUserData, isLoading, setIsLoading } =
    useContext(AuthContext);
  console.log(transaction.id);
  return (
    <TouchableOpacity
      className="border-[#D9D9D9] border-b-[1px] p-4 my-[10px] rounded-[10px]"
      onPress={() =>
        router.navigate(`/dashboard/transactions/${transaction.id}`)
      }
    >
      <View className="flex-row items-center justify-between">
        {transaction.type == "funding" ? (
          <Text className="text-[14px] font-bold">Money Deposit</Text>
        ) : transaction.receiverId == userData.id ? (
          <Text className="text-[14px] font-bold">Money Deposit</Text>
        ) : (
          <Text className="text-[14px] font-bold">
            Transfer to {transaction.receiver.firstName}{" "}
            {transaction.receiver.lastName}
          </Text>
        )}
        <Text className="text-[14px] font-bold">+NGN {transaction.amount}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[12px]">
          {Date(transaction.createdAt).split("G")[0]}
        </Text>
        <View className="bg-green-200 p-1 rounded-[10px]">
          <Text className="text-[12px] text-green-700">
            {transaction.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
