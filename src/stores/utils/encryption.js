import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptMe = (item) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(item, SECRET_KEY).toString();
    const encoded = encodeURIComponent(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted)));
    return encoded;
  } catch (error) {
    console.error("Error al encriptar:", error);
  }
  return null;
};

export const decryptMe = (item) => {
    try {
      const decoded = decodeURIComponent(item);
      const decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(decoded).toString(CryptoJS.enc.Utf8), SECRET_KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error al desencriptar:", error);
    }
    return null;
  };