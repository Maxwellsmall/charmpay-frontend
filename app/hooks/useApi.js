import axios from "axios";
const signup = async (
  firstname,
  lastname,
  phoneNumber,
  passcode,
  transactionPin,
  countryCode,
  email
) => {
  try {
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/signup",
      {
        firstname,
        lastname,
        phoneNumber,
        passcode,
        transactionPin,
        countryCode,
        email,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { signup };
