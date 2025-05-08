import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 py-4">
        <Text className="text-3xl font-bold text-center text-purple-700 mb-4">
          About Charmpay
        </Text>

        <Text className="text-base text-gray-700 leading-relaxed mb-6">
          Charmpay is a secure and reliable escrow payment solution designed to
          protect buyers and sellers during online transactions. Whether you're
          trading goods, services, or digital assets, Charmpay ensures that your
          funds are only released when both parties are satisfied.
        </Text>

        <View className="bg-purple-100 p-4 rounded-2xl shadow-md mb-4">
          <Text className="text-lg font-semibold text-purple-800 mb-2">
            How It Works
          </Text>
          <Text className="text-gray-700">
            1. Buyer deposits funds into escrow.{"\n"}
            2. Seller delivers the product or service.{"\n"}
            3. Buyer confirms delivery.{"\n"}
            4. Charmpay releases the funds to the seller.
          </Text>
        </View>

        <View className="bg-green-100 p-4 rounded-2xl shadow-md mb-4">
          <Text className="text-lg font-semibold text-green-800 mb-2">
            Why Choose Charmpay?
          </Text>
          <Text className="text-gray-700">
            • Fraud protection{"\n"}• Seamless user experience{"\n"}•
            Transparent process{"\n"}• Fast and secure payments
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-sm text-gray-600 text-center">
            Trusted by users across Africa. Your money, our responsibility.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
