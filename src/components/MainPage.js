import MainBody from "./MainBody";
import { useLocation } from "react-router-dom";
const MainPage = () => {
  const location = useLocation();
  return (
    <>
      <h1 id="main-heading">{`Welcome ${location?.state?.username}`}</h1>
      <div className="login-container">
        <MainBody uid={location?.state?.uid} />
      </div>
    </>
  );
};

export default MainPage;
