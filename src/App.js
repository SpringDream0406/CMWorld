import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Geolocation from "./pages/geolocation/Geolocation";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":navigationTagName" element={<Home />} />
        </Route>
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
