import { View, Text, ScrollView } from "react-native";
import React from "react";
import Transactions from "@/components/Transactions";

export default function history() {
  return (
    <View className="flex-1, mx-5">
      <ScrollView>
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
      </ScrollView>
    </View>
  );
}
