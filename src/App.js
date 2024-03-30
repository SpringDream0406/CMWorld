import { Route, Routes } from "react-router-dom";
import "./App.css";
import { geolocation } from "./components/geolocation";
import NavigationBar from "./NavigationBar";
import Aboutleft from "./pages/About/AboutLeft";
import AboutRight from "./pages/About/AboutRight";
import MainLeft from "./pages/main/MainLeft";
import MainRight from "./pages/main/MainRight";

function App() {
  geolocation();

  return (
    <div className="background">
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <div className="wrapper__left">
                <Routes>
                  <Route path="/main" element={<MainLeft />} />
                  <Route path="/about" element={<Aboutleft />} />
                </Routes>
              </div>

              <div className="wrapper__right">
                <Routes>
                  <Route path="/main" element={<MainRight />} />
                  <Route path="/about" element={<AboutRight />} />
                </Routes>
              </div>
              <NavigationBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
