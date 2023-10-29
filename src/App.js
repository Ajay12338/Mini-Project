import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  );
};

export default App;
