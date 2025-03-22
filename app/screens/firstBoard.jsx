import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";

const Page = () => {
  const router = useRouter();
  const moveAnim = useRef(new Animated.Value(200)).current; // Start off-screen (left)

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0, // Move to original position
      duration: 500, // Duration: 1 second
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.navigate("/auth")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Moving Image */}
      <Animated.View
        style={[styles.balanceCard, { transform: [{ translateX: moveAnim }] }]}
      >
        <Image
          source={require("../../assets/images/Boarding_Image.png")}
          // className="mx-[20px]"
          style={{ marginHorizontal: 50, width: "100%" }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Text Content */}
      <Animated.View
        style={[
          styles.textContainer,
          { transform: [{ translateY: moveAnim }] },
        ]}
      >
        <Text style={styles.heading}>
          Your Money, Protected. Your Transactions, Hassle-Free
        </Text>
        <Text style={styles.description}>
          We know trust matters. That’s why we created an escrow payment system
          that ensures your money stays safe until the job is done.
        </Text>
      </Animated.View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.navigate("/screens/secondBoard")}
      >
        <Text style={styles.getStartedText}>Next</Text>
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
    alignSelf: "flex-start",
    marginTop: 30,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  skipText: {
    fontSize: 16,
    color: "#000",
  },
  balanceCard: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 10,
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
    width: "90%",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#301B92",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
