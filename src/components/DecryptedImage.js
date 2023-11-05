import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import debounce from 'lodash.debounce';

const DecryptedImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let image = location?.state?.images;
    let date = location?.state?.dates;
    let s_key = location?.state?.key;
    const [filteredImage,setFilteredImage] = useState(image);
    const [filteredDate,setFilteredDates] = useState(date);
    const [inputText,setInputText] = useState("");

    useEffect(() => {
        document.body.classList.add("home");
        return () => {
          document.body.classList.remove("home");
        };
      }, []);
      const filterImages = () =>{
        if(inputText === "")
        {
            setFilteredImage(image);
            setFilteredDates(date);
        }
         
        else{
            let newImgArray = image.filter((curr,index) =>{
                if (date[index].toLowerCase().match(inputText.toLowerCase())) return true;
                return false;
            })
            let newDateArray = date.filter((curr) =>{
                if(curr.toLowerCase().match(inputText.toLowerCase())) return true;
                return false;
            })
            setFilteredDates(newDateArray);
            setFilteredImage(newImgArray);
        }
      }
    return (
        <div id="decrypted-main-div">
            <div id="decr-filter-search">
                <input type="text" placeholder="by date added" id="dec-search-input" onChange={(e)=>{
                    const debounced = debounce(() => {
                        setInputText(e.target.value);
                      }, 500);
                      
                      debounced();
                }}/>
                <button id="dec-filter-search-btn" onClick={filterImages}>Search</button>
            </div>
        <div  id="decrypted-grid">
            {filteredImage.map((curr,i)=>{
                const decrypted = CryptoJS.AES.decrypt(curr, s_key);
                const decryptedImageURL = decrypted.toString(CryptoJS.enc.Utf8);
                return(
                <div key = {`image ${i}`} id="dec-img-cell">
                <img src={decryptedImageURL} alt="decrypted-img-list"></img>
                <p id="date-text">{filteredDate[i]}</p>
                </div>
                ); 
            })}
        </div>
            <button key = {"shds4vskddj"} id="close-btn" onClick={()=>{
                navigate("/mainpage");
            }}>Close</button>
        </div>
    );
}

export default DecryptedImage;