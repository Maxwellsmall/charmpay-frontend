import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function Page() {
  return (
    <ScrollView>
      <View className="mx-6">
        <Text className="font-bold text-xl">Security Check</Text>
        <View className="py-6">
          <Text className="pb-3 text-[20px]">
            To keep your account and funds safe, we may occasionally perform a
            Security Check. This process helps us verify your identity, prevent
            fraud, and ensure transactions are secure for everyone.
          </Text>

          <Text className="pb-3 text-[20px]">
            Why Am I Being Asked to Complete a Security Check? You may be
            prompted for a security check if: You're logging in from a new
            device or location. A high-value transaction is being made. We
            detect unusual activity on your account. You’re updating sensitive
            account information (e.g., email, password, payment details).
          </Text>
          <Text className="pb-3 text-[20px]">
            What Does the Security Check Involve? Depending on the situation,
            the check may include: Verifying your phone number or email.
            Entering a one-time passcode (OTP) sent via SMS or email. Confirming
            your identity with a government-issued ID. Reviewing recent
            transactions for verification.
          </Text>
          <Text className="pb-3 text-[20px]">
            How Long Does It Take? Most security checks are completed within a
            few minutes. If manual review is needed (e.g., document
            verification), it may take up to 24 hours. Tips to Pass Security
            Checks Smoothly Use the latest version of the app. Ensure your
            contact info is accurate and up to date. Respond promptly to
            verification requests. Avoid using VPNs or proxies that may trigger
            security flags.
          </Text>
          <Text className="pb-3 text-[20px]">
            Need Help? If you're having trouble completing a security check or
            believe it was triggered by mistake, contact our support team for
            assistance. Your security is our priority. These checks are in place
            to protect your money, your data, and your peace of mind.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
