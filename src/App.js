import { Route, Routes } from "react-router-dom";
import "./App.css";
import { getLocation } from "./components/geolocation";
import Home from "./pages/home/Home";
import Geolocation from "./pages/Geolocation";
import NotFound from "./pages/NotFound";

function App() {
  const fetchData = async () => {
    try {
      const position = await getLocation();
      console.log(position);
    } catch (error) {}
  };
  fetchData();

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
