import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SMS from "expo-sms";
import useApi from "@/hooks/Api";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function Page() {
  const router = useRouter();
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const { transactionId } = useLocalSearchParams();

  const { getTransactionById } = useApi;
  const fetchTransaction = async () => {
    let response = await getTransactionById(transactionId, setLoading);
    setTransaction(response);
  };
  useEffect(() => {
    console.log(transactionId);
    fetchTransaction();
  }, []);

  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [""], // Phone number(s) as an array
        `Transaction @Charmpay
          Reciever: ${transaction?.receiver?.firstName} ${
          transaction?.receiver?.lastName
        }
          Type: ${transaction?.status}
          PhoneNumber: ${transaction?.receiver?.phoneNumber.slice(0, -5)}****
          Date: ${Date(transaction?.createdAt).split("G")[0]}
          Amount: ${transaction?.amount}
          Id: ${transaction.id}` // Your message
      );
      console.log("SMS Result:", result); // result = 'sent' | 'cancelled'
    } else {
      alert("SMS is not available on this device");
    }
  };

  return loading ? (
    <View className="flex-1 w-full justify-center items-center">
      <ActivityIndicator size={30} />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 px-5 items-center bg-[#f2f2f2]">
        <View className="bg-white w-[100%] py-10 mt-5 justify-center items-center rounded-lg ">
          <Text>
            Transfer to {transaction?.receiver?.firstName}{" "}
            {transaction?.receiver?.lastName}
          </Text>
          <View className="flex-row items-center">
            <FontAwesome6 name="naira-sign" size={25} />
            <Text className="text-[30px] font-bold">{transaction?.amount}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name="checkmark-circle-outline"
              color={"#008000"}
              size={12}
            />
            <Text className="text-green-500 capitalize">
              {transaction?.status}
            </Text>
          </View>
        </View>
        <View className="bg-white w-[100%] p-6 mt-5 justify-center items-center rounded-lg">
          <Text className="text-[14px] text-black text-left w-full font-bold mb-5 mx-5">
            Transaction Details
          </Text>
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">
              Reciepiant Details
            </Text>
            <View className="">
              <Text className="font-semibold w-52">
                {transaction?.receiver.firstName}{" "}
                {transaction?.receiver.lastName}
              </Text>
              <Text className="font-normal text-[10px] text-slate-400">
                {transaction?.receiver.email}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">
              Transaction Date
            </Text>
            <Text className="font-semibold w-52">
              {Date(transaction?.createdAt).split("G")[0]}
            </Text>
          </View>

          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">
              Transaction Type
            </Text>
            <Text className="font-semibold w-52 capitalize">
              {transaction.status}
            </Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">Transaction Id</Text>
            <Text className="font-semibold w-52 capitalize">
              {transaction.id}
            </Text>
          </View>
        </View>
        <View className="w-96 flex-row justify-between px-2 items-center self-center mt-auto mb-4">
          <TouchableOpacity
            className="px-7 py-3 rounded-full bg-white border-[1px] border-[#301B92]"
            onPress={() =>
              router.navigate(`/tasks/disputes/${transaction?.taskId}`)
            }
          >
            <Text className="text-[#301B92]">Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-7 py-3 rounded-full bg-blue-900"
            onPress={sendSMS}
          >
            <Text className="text-white">Share Recipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
