import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase_init";
import { useNavigate } from "react-router-dom";
const MainBody = (props) => {
  const [originalImage, setOriginalImage] = useState(null);
  const navigate = useNavigate();
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
        const docRef = await addDoc(collection(db, props.uid), {
          date_added: new Date(),
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

  const handleDecrypt = async () => {
    const password = "yoursecretpassword1";
    let encrypted_images = [];
    let dates_of_images = [];
    try{
      const querySnapshot = await getDocs(collection(db, props.uid));
      querySnapshot.forEach((doc) => {
        encrypted_images.push(doc.data().enc_data);
        dates_of_images.push(doc.data().date_added);
      });
      navigate("/decrypted_image",{state:{images:encrypted_images, dates:dates_of_images,key:password}})
    }
    catch(err){
      alert(`Error ${err}`);
    }
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
          <img src={originalImage} alt="Decrypted" width="200" height="200"/>
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
