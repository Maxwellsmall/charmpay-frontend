import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateNumber = (phoneNumber) => {
  const phoneRegex = /^\d+$/; // Only allows digits (0-9)
  return phoneRegex.test(phoneNumber);
};

const useApi = () => {
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
      await registerForPushNotificationsAsync(response.data.token);
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
        Alert.alert("", response.status);
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
  const logout = async (setUserData) => {
    try {
      await unRegisterForPushNotificationsAsync();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.multiRemove(["token", "expoTokenId"]);
      await setUserData({});
      Alert.alert("", "Account Logged out successfully");
      router.dismissTo("/auth/");
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
    description,
    assignedTo,
    amount,
    dueDate,
    setLoading
  ) => {
    console.log(title, description, assignedTo, amount, dueDate);
    try {
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      if (!title || !description || !amount || !dueDate) {
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
          description,
          assignedTo,
          amount,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      Alert.alert("", response.data.message);
      const notificationUtils = In_local_notification();

      // Request permission and then schedule the notification
      const runNotifications = async () => {
        const permissionGranted =
          await notificationUtils.requestNotificationsPermissions();
        if (permissionGranted) {
          await notificationUtils.schedulePushNotification(
            "Charmpay",
            "A new task created on charmpay."
          );
        }
      };

      runNotifications();

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
  const registerForPushNotificationsAsync = async (authToken) => {
    try {
      let token = (await Notifications.getExpoPushTokenAsync()).data;

      console.log("expo-push-token", token);
      console.log("jwt-token", authToken);

      // Send token to your backend server
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/user/registerPushToken`,
        { token }, // Request body
        {
          headers: { Authorization: `Bearer ${authToken}` }, // Config with headers
        }
      );

      Alert.alert("", response.data.message);
      console.log(response.data);
      await AsyncStorage.setItem("expoTokenId", response.data.expoPushToken);
      return response;
    } catch (error) {
      if (error)
        console.error("Post Token Error:", error.response.data.message);
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message || "Failed."
          : "Check your internet connection."
      );
    }
  };
  const unRegisterForPushNotificationsAsync = async () => {
    try {
      const tokenId = await AsyncStorage.getItem("expoTokenId");
      const token = await AsyncStorage.getItem("token");

      console.log("expo-push-token-id", tokenId);

      // Send token to your backend server
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/user/registerPushToken`,
        { tokenId }, // Request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Config with headers
        }
      );

      console.log(response.data);
      return response;
    } catch (error) {
      if (error)
        console.error("remove Token Error:", error.response.data.message);
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message || "Failed."
          : "Check your internet connection."
      );
    }
  };

  const In_local_notification = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Function to request permissions
    async function requestNotificationsPermissions() {
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
    async function schedulePushNotification(title, body) {
      const hasPermission = await requestNotificationsPermissions();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          // data: { data: "goes here", test: { test1: "more data" } },
        },
        trigger: { seconds: 2 }, // Corrected trigger type
      });
    }
    return {
      requestNotificationsPermissions,
      schedulePushNotification,
    };
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
      router.replace(`/dashboard/transactions/${response.data.transactionId}`);
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
    accountNumber,
    type,
    name,
    bankCode,
    setLoading
  ) => {
    try {
      console.log(accountNumber, type, name, bankCode);
      const token = await AsyncStorage.getItem("token");
      setLoading(true);

      if (!accountNumber || !type) {
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

      console.log(response.data.recipient_code);
      router.navigate(`/funding/${JSON.stringify(response.data.data)}`);
      return response.data;
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message || "Failed to Withdraw."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchBankBeneficiary = async (
    accountNumber,
    type,
    bankCode,
    setLoading
  ) => {
    try {
      console.log(accountNumber, type, bankCode);
      const token = await AsyncStorage.getItem("token");
      setLoading(true);

      if (!accountNumber) {
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
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/misc/bank/resolveAccount?accountNumber=${accountNumber}&bankCode=${bankCode}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      await initializeWithdraw(
        accountNumber,
        type,
        response.data.data.account_name,
        bankCode,
        setLoading
      );
      return response.data;
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message || "Failed to Withdraw."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  const withdraw = async (amount, recipient, transactionPin, setLoading) => {
    try {
      setLoading(true);
      console.log(amount, recipient, transactionPin);
      const token = await AsyncStorage.getItem("token");

      if (!amount) {
        Alert.alert("", "Insert Your Amount of Withdrawal");
        return;
      }
      if (!validateNumber(amount)) {
        Alert.alert("", "Invalid amount");
        return;
      }
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/withdraw/`,
        {
          amount,
          recipient,
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
      router.dismiss(2);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message || "Failed to Withdraw."
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
        `${process.env.EXPO_PUBLIC_API_URL}/api/misc/banks`,
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
  const recieverEvidence = async (disputeId, text, setLoading) => {
    try {
      console.log(disputeId, text);
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      if (!text) {
        Alert.alert("", "You must provude an evidence before submission");
        return;
      }
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/dispute/${disputeId}/addReceiverEvidence`,
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
      router.dismiss(2);
    } finally {
      setLoading(false);
    }
  };
  const disapproveTask = async (taskId, transactionPin, setLoading) => {
    try {
      console.log(taskId, transactionPin);
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      if (!transactionPin) {
        Alert.alert("", "You must provide an evidence before submission");
        return;
      }
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/task/${taskId}/disapprove`,
        {
          transactionPin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      console.log("success");
      Alert.alert("", response.data.message);
      router.back();
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
      console.error("error", error.response);
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
  const approveTask = async (taskId, transactionPin, setLoading) => {
    try {
      console.log(taskId, transactionPin);
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      if (!transactionPin) {
        Alert.alert("", "You must provude an evidence before submission");
        return;
      }
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/task/${taskId}/approve`,
        {
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
  const getAllDisputes = async (setLoading) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/dispute/me`,
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

      console.log("Disputes:", response.data);
      return response.data;
    } catch (error) {
      console.error("Disputes Fetch Error:", error);
      setErrorMessage(
        "Error",
        error.response
          ? error.response.data.message || "Failed to fetch."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const getDisputeById = async (disputeId, setLoading) => {
    try {
      setLoading(true);
      if (!disputeId) Alert.alert("", "NO dispute id");
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/dispute/${disputeId}`,
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

      console.log("Dispute:", response.data);
      return response.data;
    } catch (error) {
      console.error("Dispute Fetch Error:", error);
      Alert.alert(
        "",
        error.response
          ? error.response.data.message || "Failed to fetch Dispute."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  const enableTwoFactorAuth = async (value, setLoading) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/settings/toggle2FA?twoFA=${value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("result:", response.data);
      Alert.alert("", response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(
        error,
        error.response
          ? error.response.data.message || "Failed to fetch."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  const enableEmailNotification = async (email, setLoading) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/settings/toggleEmailNotifications?emailNotifications=${email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("email:", response.data);
      Alert.alert("", response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(
        error,
        error.response
          ? error.response.data.message || "Failed to fetch."
          : "Check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  return {
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
    registerForPushNotificationsAsync,
    unRegisterForPushNotificationsAsync,
    In_local_notification,
    transfer,
    initializeWithdraw,
    fetchBankBeneficiary,
    withdraw,
    getAllBanks,
    raiseDispute,
    recieverEvidence,
    disapproveTask,
    approveTask,
    getAllDisputes,
    getDisputeById,
    enableEmailNotification,
    enableTwoFactorAuth,
  };
};

export default useApi;
