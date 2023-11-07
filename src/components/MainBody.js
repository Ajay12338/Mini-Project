import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase_init";
import secret_key from "../utils/secret_key";
const MainBody = (props) => {
  const [originalImage, setOriginalImage] = useState(null);
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
      const password = secret_key();
      const encrypted = CryptoJS.AES.encrypt(originalImage, password);
      console.log("Encrypted Data: \n", encrypted.toString());
      try {
        await addDoc(collection(db, props.uid), {
          date_added: new Date().toDateString(),
          desc: `Secret Image`,
          enc_data: encrypted.toString(),
        });
        alert(props.uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    setOriginalImage(null);
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
          <img src={originalImage} alt="Decrypted" width="200" height="200" />
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
      </div>
    </>
  );
};

export default MainBody;
