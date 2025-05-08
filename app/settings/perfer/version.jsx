import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  rootStyle,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { router } from "expo-router";
import useApi from "@/hooks/useApi";

const CELL_COUNT = 6; // Number of digits in the passcode

const Page = () => {
  return (
    <View className="flex-1 justify-start items-center bg-white pt-[20px]">
      <View>
        <Text className="text-blue-900 font-[600] text-center text-[30px] mb-[10px]">
          CharmPay
        </Text>
      </View>
      <View>
        <Text className="text-blue-900 font-[600] text-center text-[30px] mb-[10px]">
          v.2.0
        </Text>
      </View>

      <TouchableOpacity className="bg-blue-900 w-96 p-3 rounded-lg absolute bottom-5 flex-row justify-center items-center">
        <Text className="text-white text-center font-semibold">
          Check for Updates
        </Text>
      </TouchableOpacity>
    </View>
  );
};
