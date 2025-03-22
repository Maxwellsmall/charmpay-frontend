import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import RecipientModal from "@/components/RecipientModal";
import profileImage from "@/assets/images/OIP.png";
import { router } from "expo-router";

export default function CreateTask() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipient, setRecipient] = useState(null);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 mt-4">
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Title</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Task Title"
            //   onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Description</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full rounded-md"
            placeholder="Enter Task Description"
            multiline
            numberOfLines={10}
            //   onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Amount</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Amount to be held in escrow"
            keyboardType="number-pad"
            //   onChangeText={(text) => setFirstName(text)}
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
          ) : (
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => setIsModalVisible(true)}
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <View className="p-4 mt-auto bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-96 p-3 rounded-lg self-center"
          onPress={() => router.replace("/tasks/success")}
        >
          <Text className="text-white text-center font-semibold">
            Create task
          </Text>
        </TouchableOpacity>
      </View>
      <RecipientModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setRecipient={setRecipient}
      />
    </SafeAreaView>
  );
}
