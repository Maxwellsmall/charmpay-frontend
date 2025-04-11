import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateNumber = (phoneNumber) => {
  const phoneRegex = /^\d+$/; // Only allows digits (0-9)
  return phoneRegex.test(phoneNumber);
};

const signup = async (transactionPin, setLoading) => {
  try {
    setLoading(true);
    if (!transactionPin) {
      Alert.alert("", "Create a transaction pin before submission");
      return;
    }
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    credentials.transactionPin = transactionPin;
    console.log(credentials);
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/auth/signup`,
      credentials
    );
    console.log(response.data);
    Alert.alert("", "Created a bonified account successfully");
    router.navigate("/auth/signup/verify/success");
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    Alert.alert(
      "",
      error.response.data.message
        ? error.response.data.message
        : "Check your Internet connection"
    );
  } finally {
    setLoading(false);
  }
};
const login = async (email, passCode, setLoading) => {
  try {
    setLoading(true);
    if (!email || !passCode) {
      Alert.alert("", "Input your details before submission");
      return;
    }

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
      {
        email,
        passCode,
      }
    );
    console.log(response.data);
    const token = response.data.token;
    console.log(token);
    AsyncStorage.setItem("token", token);

    if (!response.data.user.emailVerified) {
      router.navigate("/auth/signup/verify");
      await requestOtp();
      Alert.alert(
        "",
        "Logged in successfully, verify your account to continue"
      );
      return response.data;
    }
    Alert.alert("", "Logged in successfully");

    router.dismissAll();
    router.push("/(tabs)/dashboard");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(
      "",
      (error.response.data.message && error.response.data.message) ||
        "Check your internet connection"
    );
  } finally {
    setLoading(false);
  }
};

const storeData = async (
  firstName,
  lastName,
  phoneNumber,
  countryCode,
  email
) => {
  try {
    if (!firstName || !lastName || !phoneNumber || !countryCode || !email) {
      Alert.alert("", "Please fill up form before submission");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("", "Invalid email format");
      return;
    }
    if (!validateNumber(phoneNumber)) {
      Alert.alert("", "Invalid phone number");
      return;
    }
    await AsyncStorage.setItem(
      "credentials",
      JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        email,
      })
    );

    const data = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(data);

    console.log(credentials);
    router.navigate("/auth/signup/code/passcode");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

const storePasscode = async (passcode, confirmPasscode) => {
  try {
    if (!passcode || !confirmPasscode) {
      Alert.alert("", "Please insert passcode before submission");
      return;
    }
    if (passcode !== confirmPasscode) {
      Alert.alert("", "The passcodes does not match");
      return;
    }
    const data = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(data);

    credentials.passCode = passcode;
    await AsyncStorage.setItem("credentials", JSON.stringify(credentials));

    router.navigate("/auth/signup/code/transactionCode");
  } catch (error) {
    console.log(error);
  }
};

const verify = async (otp, setLoading) => {
  console.log("otp", otp);
  try {
    setLoading(true);
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    const email = credentials.email;
    console.log(email, otp);
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/auth/verify/account`,
      {
        email,
        otp,
      }
    );
    router.navigate("/auth/login");
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    Alert.alert(
      "",
      error.response.data.message
        ? error.response.data.message
        : "Check Your Internet Connection"
    );
  } finally {
    setLoading(false);
  }
};
const requestOtp = async (setLoading) => {
  try {
    setLoading(true);
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    const email = credentials.email;
    console.log(email);
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/auth/verify/requestOTP`,
      {
        email,
      }
    );
    console.log(response.data);
    Alert.alert("", "An OTP has been sent to your email");
    return response.data;
  } catch (error) {
    Alert.alert("", error.response.data.error.message);
  } finally {
    setLoading(false);
  }
};
const getProfile = async (setLoading) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No authentication token found. Please log in.");
      router.replace("/auth/login");
      return;
    }

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Handle 401 Unauthorized error explicitly
    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("User Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response);
    // Show error message based on error type
    if (error.response?.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch profile."
        : "Check your internet connection.",
      [{ text: "Retry", onPress: () => getProfile(setLoading) }]
    );
  } finally {
    setLoading(false);
  }
};
const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    Alert.alert("", "Account Logged out successfully");
    router.dismissAll();
    router.push("/auth/");
  } catch (error) {
    console.log(error ? error : "Check Your Internet Connection");
  }
};
const addFunding = async (
  amount,
  setIsFunding,
  setUrl,
  setLoading,
  setReferenceId
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!amount) {
      Alert.alert("", "Insert your amount");
      return;
    }
    if (!validateNumber(amount)) {
      Alert.alert("", "Invalid number");
      return;
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/funding/init`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.data);
    setUrl(response.data.data.authorization_url);
    setReferenceId(response.data.data.reference);
    setIsFunding(true);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  } finally {
    setLoading(false);
  }
};
const getAllTransactions = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/transaction/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Transactions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
  } finally {
    setLoading(false);
  }
};
const getTransactionById = async (transactionId, setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/transaction/${transactionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Transaction:", response.data);
    return response.data;
  } catch (error) {
    console.error("Transacions Fetch Error:", error);
    Alert.alert(
      "",
      error.response
        ? error.response.data.message || "Failed to fetch transactions."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const editProfile = async (firstName, lastName, setLoading) => {
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!firstName || !lastName) {
      Alert.alert("", "Edit your profile before saving");
      return;
    }

    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/me/edit`,
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("Saved!", response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const fetchAllBeneficiary = async (setLoading) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No authentication token found. Please log in.");
      router.replace("/auth/login");
      return;
    }

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/beneficiary/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);

    // Show error message based on error type
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch beneficiary."
        : "Check your internet connection.",
      [
        { text: "Retry", onPress: () => fetchAllBeneficiary(setLoading) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  } finally {
    setLoading(false);
  }
};
const createTask = async (
  title,
  discription,
  assignedTo,
  amount,
  setLoading
) => {
  console.log(title, discription, assignedTo, amount);
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!title || !discription || !amount) {
      Alert.alert("", "Ensure all inputs are filled before submission");
      return;
    }
    if (!assignedTo) {
      Alert.alert("", "Select Your recipiant");
      return;
    }
    if (!validateNumber(amount)) {
      Alert.alert("", "Invalid number");
      return;
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/task/create`,
      {
        title,
        discription,
        assignedTo,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("", response.data.message);
    router.replace("/tasks/success");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch beneficiary."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const getTaskById = async (taskId, setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/task/${taskId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Task:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task Fetch Error:", error);
    Alert.alert(
      "",
      error.response
        ? error.response.data.message || "Failed to fetch task."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const getMyTask = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/task/tome`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Task:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "",
      error.response
        ? error.response.data.message || "Failed to fetch task."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const getOthersTask = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/task/toothers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Task:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task Fetch Error:", error);
    Alert.alert(
      "",
      error.response
        ? error.response.data.message || "Failed to fetch task."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const searchTask = async (task, setLoading, setErrorMessage) => {
  console.log("tasks in api", task);
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/task/search?q=${task}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Task:", response.data);
    return response.data;
  } catch (error) {
    console.log("Task Fetch Error:", error);
    setErrorMessage(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch task."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const getUserByEmail = async (email, setLoading, setErrorMessage) => {
  try {
    if (!validateEmail(email)) return null;
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/${email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token");
      router.replace("/auth/login");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Task Fetch Error:", error);

    if (error.response?.status === 422) {
      setErrorMessage("Email cannot be a recipient");
    } else {
      setErrorMessage(error.response?.data?.message || "User not found.");
    }

    return null;
  } finally {
    setLoading(false);
  }
};

const getAllNotifications = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/notification/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Notifications:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task Fetch Error:", error);
    setErrorMessage(
      "Error",
      error.response
        ? error.response.data.message || "Failed to notifications."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const registerForPushNotificationsAsync = async () => {
  let token = (await Notifications.getExpoPushTokenAsync()).data;

  // Send token to your backend server
  await fetch("https://your-backend.com/api/save-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return token;
};

const In_local_notification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Function to request permissions
  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable notifications in settings."
      );
      return false;
    }
    return true;
  }

  // Function to schedule a notification
  async function schedulePushNotification() {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 2 }, // Corrected trigger type
    });
  }
};

const push_notification = () => {
  //   import { useState, useEffect, useRef } from 'react';
  // import { Text, View, Button, Platform, Alert } from 'react-native';
  // import * as Device from 'expo-device';
  // import * as Notifications from 'expo-notifications';
  // import Constants from 'expo-constants';

  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  //export default

  function App() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [channels, setChannels] = useState([]); // Fixed TypeScript syntax
    const [notification, setNotification] = useState(null);
    const notificationListener = useRef(null);
    const responseListener = useRef(null);

    useEffect(() => {
      registerForPushNotificationsAsync().then((token) => {
        if (token) setExpoPushToken(token);
      });

      if (Platform.OS === "android") {
        Notifications.getNotificationChannelsAsync().then((value) =>
          setChannels(value || [])
        );
      }

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    }, []);

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <Text>{`Channels: ${JSON.stringify(
          channels.map((c) => c.id),
          null,
          2
        )}`}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification?.request?.content?.title || "No Notification"}
          </Text>
          <Text>Body: {notification?.request?.content?.body || "No Body"}</Text>
          <Text>
            Data:{" "}
            {notification
              ? JSON.stringify(notification.request.content.data)
              : "No Data"}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={schedulePushNotification}
        />
      </View>
    );
  }

  // ✅ Fixed Notification Scheduling
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 2 }, // Fixed incorrect trigger
    });
  }

  // ✅ Fixed Push Notification Registration
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("myNotificationChannel", {
        name: "Default Channel",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Permission Denied", "Enable notifications in settings.");
        return;
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) throw new Error("Project ID not found");

        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log("Expo Push Token:", token);
      } catch (e) {
        console.error(e);
        token = `Error: ${e}`;
      }
    } else {
      Alert.alert("Physical device required for push notifications.");
    }

    return token;
  }
};

const transfer = async (recipientId, amount, transactionPin, setLoading) => {
  console.log(recipientId, amount, transactionPin);

  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!amount || !transactionPin) {
      Alert.alert("", "Ensure all inputs are filled before submission");
      return;
    }
    if (!recipientId) {
      Alert.alert("", "Select Your recipiant");
      return;
    }
    if (!validateNumber(amount)) {
      Alert.alert("", "Invalid number");
      return;
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/transaction/direct`,
      {
        amount,
        recipientId,
        transactionPin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("", response.data.message);
    router.replace("/funding/success");
    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to transfer."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const initializeWithdraw = async (
  name,
  type,
  bankCode,
  accountNumber,
  setLoading
) => {
  try {
    console.log(name, type, bankCode, accountNumber);
    const token = await AsyncStorage.getItem("token");
    setLoading(true);

    if (!name || !type || !bankCode || !accountNumber) {
      Alert.alert("", "Ensure all inputs are filled before submission");
      return;
    }
    if (!bankCode) {
      Alert.alert("", "Select Your recipiant");
      return;
    }
    if (!validateNumber(accountNumber)) {
      Alert.alert("", "Invalid account number");
      return;
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/withdraw/createRecipient`,
      {
        type,
        bankCode,
        name,
        accountNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("", response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to transfer."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};
const getAllBanks = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/withdraw/banks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Banks:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "",
      error.response
        ? error.response.data.message || "Failed to fetch Banks."
        : "Check your internet connection."
    );
  } finally {
    setLoading(false);
  }
};

const raiseDispute = async (taskId, text, setLoading) => {
  try {
    console.log(taskId);
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!text) {
      Alert.alert("", "You must provude an evidence before submission");
      return;
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/dispute/raise/${taskId}`,
      {
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("", response.data.message);
    router.back();
    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to send."
        : "Check your internet connection."
    );
    router.back();
  } finally {
    setLoading(false);
  }
};

export default {
  signup,
  login,
  storeData,
  storePasscode,
  verify,
  requestOtp,
  getProfile,
  logout,
  addFunding,
  editProfile,
  getAllTransactions,
  getTransactionById,
  fetchAllBeneficiary,
  createTask,
  getMyTask,
  getOthersTask,
  searchTask,
  getUserByEmail,
  getTaskById,
  getAllNotifications,
  transfer,
  initializeWithdraw,
  getAllBanks,
  raiseDispute,
};
