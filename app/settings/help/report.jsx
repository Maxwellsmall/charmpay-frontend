import { View, Text } from "react-native";
import React from "react";

export default function Page() {
  return (
    <View>
      <Text>Report Scam</Text>
      <Text>
        Your safety is our top priority. If you suspect fraudulent activity or
        believe someone is attempting to scam you on our platform, please report
        it immediately.
        {`

        `}
        What Is Considered a Scam? A scam may include, but is not limited to:
        Requests to send money outside the app. Fake job postings or task
        requests. False claims about job completion or payment. Impersonation of
        another user or official representative. Sharing suspicious links or
        phishing attempts.
        {`

        `}
        How to Report a Scam Go to the profile or chat of the suspected user.
        Tap the “Report” button. Choose “Scam or Fraud” as the reason. Provide a
        brief description and any evidence (screenshots, messages, etc.). Submit
        your report.
        {`

        `}
        What Happens After You Report Our safety team will review the report
        thoroughly. If the report is valid, we may take action such as warning,
        suspending, or banning the user. We may reach out for more details to
        support the investigation.
        {`

        `}
        Protecting Yourself from Scams Always keep communication and payments
        within the app. Never share sensitive information like bank details or
        passwords. Be cautious of deals that sound too good to be true.
        {`

        `}
        Need Help Now? If you feel at immediate risk or have already lost money
        to a scam, contact our support team directly through the app or email us
        at [charmpayinc@gmail.com]. We’re here to ensure your experience is
        safe, secure, and scam-free. Would you like to include a link or
        shortcut in-app for reporting scams quickly? Or should we tailor this to
        reflect a more casual or formal tone?
      </Text>
    </View>
  );
}
