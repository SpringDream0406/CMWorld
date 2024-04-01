import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Geolocation from "./pages/Geolocation";
import NotFound from "./pages/NotFound";
import Main from "./pages/main/Main";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          {/* =================== 일단 기본 페이지로 설정 =================== */}
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="geolocation" element={<Geolocation />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
