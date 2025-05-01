import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";
import useApi from "@/hooks/Api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { storeData } = useApi;
  const [countryCode, setCountryCode] = useState("NG"); // Default Nigeria
  const [callingCode, setCallingCode] = useState("234"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  const handleStore = () => {
    storeData(firstName, lastName, phoneNumber, callingCode, email);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View className="w-full px-5">
          <Text className="text-[24px] font-bold">Welcome to Charmpay</Text>
          <Text className="text-[14px] text-[#5e5a5aa6] font-semibold mt-[10px]">
            Create an escrow account....No more risk,just fair transactions.
          </Text>
        </View>
        <View className="w-full items-center pt-6">
          <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
            First Name
          </Text>
          <TextInput
            className="mb-3 px-4 bg-[#F5F5F5] w-[90%] h-[50px] rounded-md"
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
          />
          <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
            Last Name
          </Text>
          <TextInput
            className="mb-3 px-5 bg-[#F5F5F5] w-[90%] h-[50px] rounded-md"
            placeholder="Last Name"
            onChangeText={(text) => setlastName(text)}
          />
          <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
            Email
          </Text>
          <TextInput
            className="mb-3 px-5 bg-[#F5F5F5] w-[90%] h-[50px] rounded-md"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
            Phone number
          </Text>
          <View className="flex-row items-center bg-[#F5F5F5] w-[90%] h-[50px] rounded-md px-3">
            {/* Country Picker */}
            <CountryPicker
              withFilter
              withFlag
              withCallingCode
              withAlphaFilter
              countryCode={countryCode}
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />
            <Text className="ml-2 text-lg">+{callingCode}</Text>

            <TextInput
              keyboardType="number-pad"
              className="flex-1 ml-3"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={13}
              minLength={7}
            />
          </View>
        </View>
        <View className=" bg-white">
          <TouchableOpacity
            className="bg-blue-900 w-96 mt-8 py-4 rounded-lg self-center"
            onPress={handleStore}
          >
            <Text className="text-white text-center font-semibold">NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
