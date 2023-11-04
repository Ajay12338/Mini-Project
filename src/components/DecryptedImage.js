import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
const DecryptedImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let image = location?.state?.images;
    let dates = location?.state?.dates;
    let s_key = location?.state?.key;
    return (
        <>
        <div id="decrypted-grid">
            {image.map((curr)=>{
                const decrypted = CryptoJS.AES.decrypt(curr, s_key);
                const decryptedImageURL = decrypted.toString(CryptoJS.enc.Utf8);
                return <img src={decryptedImageURL} alt="decrypted-img-list"></img>
            })}
        </div>
        <div className="btn">
            <button id="close-btn" onClick={()=>{
                navigate("/mainpage");
            }}>Close</button>
        </div>
        </>
    );
}

export default DecryptedImage;