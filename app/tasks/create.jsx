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
import { Ionicons } from "@expo/vector-icons";
import RecipientModal from "@/components/RecipientModal";
import { router } from "expo-router";
import Beneficiary from "@/components/Beneficiary";
import User from "@/components/User";
import useApi from "@/hooks/useApi";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateTask() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");
  const { createTask } = useApi();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 mt-4">
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Title</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Task Title"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Description</Text>
          <View className="bg-[#F5F5F5] w-full rounded-md h-36 py-0">
            <TextInput
              className="px-4 "
              placeholder="Enter Task Description"
              multiline
              numberOfLines={10}
              onChangeText={(text) => setDiscription(text)}
            />
          </View>
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Amount</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Amount to be held in escrow"
            keyboardType="number-pad"
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Due Date</Text>
          <TouchableOpacity
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md flex-row items-center"
            onPress={showDatePicker}
          >
            <View className="bg-white p-1 rounded-full">
              <Ionicons name="calendar-outline" size={24} />
            </View>
            <Text className="text-[#A8A8A8] text-center font-bold ms-2">
              {selectedDate
                ? selectedDate.toDateString()
                : "Click To Select A Deadline Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Recipient</Text>
          {!recipient ? (
            <TouchableOpacity
              className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md flex-row items-center"
              onPress={() => setIsModalVisible(true)}
            >
              <View className="bg-white p-1 rounded-full">
                <Ionicons name="person-outline" size={24} />
              </View>
              <Text className="text-[#A8A8A8] text-center font-bold ms-2">
                Select Recipient
              </Text>
            </TouchableOpacity>
          ) : isBeneficiary ? (
            <Beneficiary
              recipient={recipient}
              setIsModalVisible={setIsModalVisible}
              setId={setId}
              // setIsBeneficiary={setIsBeneficiary}
            />
          ) : (
            <User
              recipient={recipient}
              setIsModalVisible={setIsModalVisible}
              setId={setId}
            />
          )}
        </View>
      </ScrollView>
      <View className="p-4 mt-auto bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center"
          onPress={() =>
            createTask(title, discription, id, amount, selectedDate, setLoading)
          }
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          <Text className="text-white text-center font-semibold ml-2">
            Create task
          </Text>
        </TouchableOpacity>
      </View>
      <RecipientModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setRecipient={setRecipient}
        setIsBeneficiary={setIsBeneficiary}
      />
    </SafeAreaView>
  );
}
