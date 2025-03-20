// src/screens/OnboardingScreenOne.js
import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Page = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          // Handle skip action (maybe go to the last screen or main app)
          router.navigate("/screens/secondBoard");
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        {/* <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$12,756.00</Text>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyText}>Add money</Text>
        </TouchableOpacity> */}
        <Image source={require("../../assets/images/Boarding_Image.png")} />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Your Money, Protected. Your Transactions, Hassle-Free
        </Text>
        <Text style={styles.description}>
          We know trust matters. That’s why we created an escrow payment system
          that ensures your money stays safe until the job is done.
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("OnboardingTwo")}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    position: "relative",
  },
  skipButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#999",
  },
  balanceCard: {
    marginTop: 40,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // shadow styles (if you want a card effect)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  addMoneyButton: {
    backgroundColor: "#6200EE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addMoneyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  textContainer: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  getStartedButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#6200EE",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
