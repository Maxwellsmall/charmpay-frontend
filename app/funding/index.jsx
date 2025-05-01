import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import useApi from "@/hooks/Api";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthProvider";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [url, setUrl] = useState("");
  const { isFunding, setIsFunding, setReferenceId } = useContext(AuthContext);
  const { addFunding } = useApi;

  if (isFunding) {
    return <WebView source={{ uri: url }} />;
  }
  return (
    <>
      <View className="px-5 bg-white">
        <View className="mt-20">
          <Text className="font-semibold text-[#9D9D9D] mb-3 text-[20px]">
            Add money
          </Text>
          <View className="py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[100%] rounded-md flex-row justify-between items-center">
            <TextInput
              className="w-full px-5 "
              placeholder="NGN"
              keyboardType="number-pad"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
          <Text className="font-semibold mt-3 text-[#9D9D9D] text-[15px]">
            Fee: NGN 10.00
          </Text>
          <TouchableOpacity
            className="bg-blue-900 w-full p-3 rounded-lg mt-3 flex-row justify-center items-center"
            onPress={() => {
              addFunding(
                amount,
                setIsFunding,
                setUrl,
                setLoading,
                setReferenceId
              );
            }}
          >
            {loading && <ActivityIndicator size={24} color={"white"} />}
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
