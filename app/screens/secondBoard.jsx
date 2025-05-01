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
      {/* Moving Image */}
      <Animated.View
        style={[styles.balanceCard, { transform: [{ translateX: moveAnim }] }]}
      >
        <Image
          source={require("../../assets/images/Boarding_Second_Image.png")}
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
        <Text style={styles.heading}>Pay Your Way WorldWide</Text>
        <Text style={styles.description}>
          Spend, save, and grow their money all together in on place.
        </Text>
      </Animated.View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.navigate("/auth")}
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
    paddingTop: 40,
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
    marginTop: 20,
  },
  description: {
    paddingHorizontal: 50,
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
