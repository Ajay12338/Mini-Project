import React from "react";
import CryptoJS from "crypto-js";

const consolePrint = () => {
  var secretKey = "YourSecretKey";
  var dataToEncrypt = "Hello, World!";

  // Encrypt the data using AES
  var encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey);

  // Get the encrypted data as a string
  var encryptedDataString = encryptedData.toString();

  console.log("Encrypted Data: " + encryptedDataString);
};

const EncryptionAES = () => {
  return <div>{"Yo"}</div>;
};

export default EncryptionAES;
