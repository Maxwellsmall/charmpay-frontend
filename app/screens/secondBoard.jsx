// src/screens/OnboardingScreenTwo.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const Page = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          // If skipping here, maybe go directly to main app
          // For now, let's just console log or do nothing
          console.log("Skipped Onboarding");
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Circle in background */}
      <View style={styles.circle} />

      {/* Overlapping rectangles */}
      <View style={styles.rectBlue} />
      <View style={styles.rectGreen} />

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Pay Your Way Worldwide</Text>
        <Text style={styles.description}>
          Spend, save, and grow their money all in one place until the job is
          done.
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => {
          // Navigate to your app’s main screen or next step
          console.log("Get Started pressed");
        }}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;

const CIRCLE_SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingHorizontal: 20,
  },
  skipButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#999",
  },
  circle: {
    position: "absolute",
    top: 80,
    left: (width - CIRCLE_SIZE) / 2, // center horizontally
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: "#E0E0E0",
    borderRadius: CIRCLE_SIZE / 2,
    zIndex: -1,
  },
  rectBlue: {
    position: "absolute",
    top: 120,
    left: width * 0.25,
    width: 120,
    height: 80,
    backgroundColor: "#4E6EF2",
    borderRadius: 8,
  },
  rectGreen: {
    position: "absolute",
    top: 150,
    left: width * 0.45,
    width: 120,
    height: 80,
    backgroundColor: "#39D697",
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 320,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
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
