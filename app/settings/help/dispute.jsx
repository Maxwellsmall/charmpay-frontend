import { View, Text } from "react-native";
import React from "react";

export default function Page() {
  return (
    <View>
      <Text>Transfer DIspute</Text>
      <Text>
        If you’ve encountered an issue with a payment transfer in your escrow
        transaction, we're here to help.
        {`
        
        `}
        A Transfer Dispute occurs when the tasker (payer) or taskman (service
        provider) disagrees with the release or status of funds held in escrow.
        Below is how disputes are handled: When Can You Raise a Dispute? You may
        initiate a dispute if:
        {`

        `}
        The taskman claims to have completed the job, but the tasker believes
        otherwise. The tasker has not approved the release of funds after job
        completion. Either party believes the payment was released in error.
        There is a disagreement regarding the scope, quality, or delivery of the
        agreed task.
        {`

        `}
        How to Raise a Dispute Go to the transaction details screen of the
        relevant job. Tap "Raise Dispute". Provide clear details, evidence, or
        documentation to support your case (photos, chat history, receipts,
        etc.). Submit the dispute for review.
        {`

        `}
        What Happens Next? Once a dispute is raised: The payment will remain
        locked in escrow until the issue is resolved. Our dispute resolution
        team will review the details provided by both parties. You may be
        contacted for additional information or clarification.
        {`

        `}
        Resolution Timeline Dispute resolutions typically take 3–5 business
        days, depending on the complexity of the issue and the responsiveness of
        both parties. Tips for a Smooth Resolution Keep all communication within
        the app. Share clear evidence supporting your claim. Remain respectful
        and professional throughout the dispute process.
        {`

        `}
        We aim to ensure fairness for both taskers and taskmen. If you have any
        questions or need assistance during the dispute process, feel free to
        contact our support team. Would you like a version of this that’s more
        casual or branded to match the tone of your app?
      </Text>
    </View>
  );
}
