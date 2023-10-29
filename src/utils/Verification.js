import { medical_ids } from "./medical_id";

const checkMedicalId = (id) => {
  for (let i = 0; i < medical_ids.length; i++) {
    if (id === medical_ids[i]) {
      return true;
    }
  }
  return false;
};
const verify = (isSignIn, ...rest) => {
  if (isSignIn) {
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(rest[0]);
    const isPasswordValid =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/.test(
        rest[1]
      );
    return isEmailValid && isPasswordValid;
  } else {
    const isValidMedicalId = checkMedicalId(rest[0]);
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(rest[1]);
    const isPasswordValid =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/.test(
        rest[2]
      );
    return isValidMedicalId && isEmailValid && isPasswordValid;
  }
};
export default verify;
