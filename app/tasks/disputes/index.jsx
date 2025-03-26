import { View, Text, ScrollView } from "react-native";
import React from "react";
import DisputeTransaction from "@/components/Disputes";

export default function history() {
  return (
    <View className="flex-1, mx-5">
      <ScrollView>
        <DisputeTransaction status="Under Review" />
        <DisputeTransaction status="Under Review" />
        <DisputeTransaction status="Under Review" />
      </ScrollView>
    </View>
  );
}
