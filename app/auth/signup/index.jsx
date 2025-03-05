import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";

export default function Page() {
  const [countryCode, setCountryCode] = useState("NG"); // Default Nigeria
  const [callingCode, setCallingCode] = useState("234"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full items-center">
          <TextInput
            className="mb-3 px-4 bg-[#F5F5F5] w-96 h-[50px] rounded-md"
            placeholder="First Name"
          />
          <TextInput
            className="mb-3 px-5 bg-[#F5F5F5] w-96 h-[50px] rounded-md"
            placeholder="Last Name"
          />
          <TextInput
            className="mb-3 px-5 bg-[#F5F5F5] w-96 h-[50px] rounded-md"
            placeholder="Email"
          />

          {/* Phone Number Input with Country Picker */}
          <View className="flex-row items-center bg-[#F5F5F5] w-96 h-[50px] rounded-md px-3">
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
            />
          </View>
        </View>
      </ScrollView>

      <View className="p-4 bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-80 p-3 rounded-lg self-center"
          onPress={() => router.navigate("/auth/signup/otp/")}
        >
          <Text className="text-white text-center font-semibold">NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
