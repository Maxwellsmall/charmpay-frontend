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
import { router, useLocalSearchParams } from "expo-router";
import useApi from "@/hooks/Api";

export default function CreateTask() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { recieverEvidence } = useApi;
  const { disputeId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 mt-4">
        <Text className="mb-[5px] text-[15px] font-bold">
          Has a dispute been raised against you?
        </Text>
        <Text
          className="mb-[20px] text-[15px] font-bold
        "
        >
          Provide an evidence message
        </Text>
        <View className="mb-3">
          <Text className="mb-[5px] text-[15px] font-semibold">
            Evidence Message
          </Text>
          <View className="bg-[#F5F5F5] w-full rounded-md h-36 py-0">
            <TextInput
              className="px-4 "
              placeholder="This is what happened..."
              multiline
              numberOfLines={10}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
        </View>
      </ScrollView>
      <View className="p-4 mt-auto bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center"
          onPress={() => recieverEvidence(disputeId, message, setLoading)}
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          <Text className="text-white text-center font-semibold ml-2">
            Submit Evidence
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
