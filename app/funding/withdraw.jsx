import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BanksModal from "@/components/BanksModal";
import { router } from "expo-router";
import Bank from "@/components/Bank";
import User from "@/components/User";
import useApi from "@/hooks/useApi";

export default function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState(0);
  const [bankCode, setBankCode] = useState("");
  const [type, setType] = useState("");
  const { initializeWithdraw } = useApi;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 mt-4">
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px] font-semibold">Name</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Account Name"
            onChangeText={(text) => setAccountName(text)}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-[5px] text-[18px] font-semibold">
            Account Number
          </Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Amount to be held in escrow"
            keyboardType="number-pad"
            onChangeText={(text) => setAccountNumber(text)}
            maxLength={10}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px] font-semibold">Bank</Text>
          {!recipient ? (
            <TouchableOpacity
              className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md flex-row items-center"
              onPress={() => setIsModalVisible(true)}
            >
              <View className="bg-white p-1 rounded-full">
                <FontAwesome name="bank" size={24} />
              </View>
              <Text className="text-[#A8A8A8] text-center font-bold ms-2">
                Select Bank
              </Text>
            </TouchableOpacity>
          ) : (
            <Bank
              recipient={recipient}
              setIsModalVisible={setIsModalVisible}
              setBankCode={setBankCode}
              setType={setType}
            />
          )}
        </View>
      </ScrollView>
      <View className="p-4 mt-auto bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center"
          onPress={() =>
            initializeWithdraw(
              accountName,
              type,
              bankCode,
              accountNumber,
              setLoading
            )
          }
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          <Text className="text-white text-center font-semibold ml-2">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <BanksModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setRecipient={setRecipient}
      />
    </SafeAreaView>
  );
}
