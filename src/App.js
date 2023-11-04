import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import DecryptedImage from "./components/DecryptedImage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/decrypted_image" element={<DecryptedImage />} />
    </Routes>
  );
};

export default App;
