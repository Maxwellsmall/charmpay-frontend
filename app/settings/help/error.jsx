import { View, Text } from "react-native";
import React from "react";

export default function Page() {
  return (
    <View>
      <Text>Report Transfer Error</Text>
      <Text>
        If you’ve experienced an unexpected issue during a payment transfer,
        we’re here to help you resolve it quickly and securely.
        {`

        `}
        What Is a Transfer Error? A transfer error can happen when: A payment
        was sent to the wrong person. The transfer amount is incorrect. The
        funds didn’t reflect in your account or wallet. You were charged but the
        payment wasn’t processed. A duplicate payment occurred.
        {`

        `}
        How to Report a Transfer Error Go to the affected transaction under your
        Transactions or Job History. Tap “Report Issue” or “Report Transfer
        Error”. Select the type of error from the list. Add any relevant notes
        or screenshots to help us understand the issue. Submit the report. What
        Happens Next?
        {`

        `}
        Our team will review your report within 24–48 hours. We may contact you
        for more information or clarification. If it’s a verified error, we’ll
        correct the transfer or issue a refund as soon as possible.
        {`

        `}
        Important Notes All transfer error reports must be submitted within 7
        days of the transaction date. Please ensure your app and payment method
        details are up to date to avoid future errors.
        {`

        `}
        Need Immediate Help? If your issue is urgent (e.g., a large amount was
        misdirected), reach out to our support team directly via in-app chat or
        email us at [support@email.com]. Let me know if you want to localize
        this or make it more aligned with your brand’s voice — whether that’s
        more casual, formal, or friendly.
      </Text>
    </View>
  );
}
