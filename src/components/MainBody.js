import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase_init";

const MainBody = (props) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [imageNo, setImageNo] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEncrypt = async () => {
    if (originalImage) {
      const password = "yoursecretpassword1";
      const encrypted = CryptoJS.AES.encrypt(originalImage, password);
      console.log("Encrypted Data: \n", encrypted.toString());
      try {
        const docRef = await addDoc(collection(db, "himanshu"), {
          id: imageNo,
          desc: `Image No ${imageNo}`,
          enc_data_1: encrypted.toString(),
        });
        alert("Document written with ID: ", props.uid);
        setImageNo(imageNo + 1);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    setOriginalImage(null);
  };

  const handleDecrypt = async () => {
    const password = "yoursecretpassword1";
    const querySnapshot = await getDocs(collection(db, "Himanshu_fboy"));
    let encryptedImage;
    querySnapshot.forEach((doc) => {
      encryptedImage = doc.data().enc_data_1;
    });
    const decrypted = CryptoJS.AES.decrypt(encryptedImage, password);
    const decryptedImageURL = decrypted.toString(CryptoJS.enc.Utf8);
    setOriginalImage(decryptedImageURL);
  };
  useEffect(() => {
    document.body.classList.add("main-body");
    return () => {
      document.body.classList.remove("main-body");
    };
  }, []);

  return (
    <>
      {originalImage && (
        <div>
          <img src={originalImage} alt="Decrypted" width="200" />
        </div>
      )}
      <div className="btn">
        <label htmlFor="file-input" className="custom-file-input-img">
          Choose an image
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button className="btn-submit" onClick={handleEncrypt}>
          upload to DB
        </button>
        <button className="btn-submit" onClick={handleDecrypt}>
          Retrieve from dB
        </button>
      </div>
    </>
  );
};

export default MainBody;
