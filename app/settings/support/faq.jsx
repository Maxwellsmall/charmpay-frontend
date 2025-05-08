import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View className="mb-4">
      <Pressable
        onPress={toggleOpen}
        className="bg-purple-100 px-4 py-3 rounded-xl shadow-sm"
      >
        <Text className="text-base font-semibold text-purple-800">
          {question}
        </Text>
      </Pressable>
      {open && (
        <View className="px-4 pt-2 pb-3 bg-white border border-purple-200 rounded-b-xl">
          <Text className="text-gray-700">{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "What is Charmpay?",
      answer:
        "Charmpay is an escrow platform that protects both buyers and sellers by holding payments securely until both parties fulfill their obligations.",
    },
    {
      question: "How do I start a transaction?",
      answer:
        "Simply sign in, choose a transaction type, deposit funds into escrow, and invite the other party to participate.",
    },
    {
      question: "Is there a fee for using Charmpay?",
      answer:
        "Yes, we charge a small service fee which is displayed before you confirm any transaction. There are no hidden charges.",
    },
    {
      question: "How long does it take to release funds?",
      answer:
        "Funds are typically released instantly after buyer confirmation. Delays may occur if there's a dispute or verification required.",
    },
    {
      question: "What happens in case of a dispute?",
      answer:
        "Our resolution team steps in to review evidence from both parties and decide the outcome fairly. You can upload supporting documents or messages.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 py-4">
        <Text className="text-3xl font-bold text-center text-purple-700 mb-6">
          Frequently Asked Questions
        </Text>

        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}

        <Text className="text-center text-sm text-gray-500 mt-6">
          Still have questions? Contact us at{" "}
          <Text className="text-purple-600 font-semibold">
            charmpayinc@gmail.com
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
