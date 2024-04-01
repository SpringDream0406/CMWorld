import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile";
import Project from "./pages/project/Project";
import Jukbox from "./pages/Jukbox";
import Playground from "./pages/Playground";
import Photo from "./pages/Photo";
import Guestbook from "./pages/Guestbook";
import Setting from "./pages/Setting";
import Geolocation from "./pages/Geolocation";
import NotFound from "./pages/NotFound";
import TeamProject from "./pages/project/components/TeamProject";
import PersonalProject from "./pages/project/components/PersonalProject";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          {/* =================== 일단 기본 페이지로 설정 =================== */}
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="project" element={<Project />}>
            <Route path="teamproject" element={<TeamProject />} />
            <Route path="personalproject" element={<PersonalProject />} />
          </Route>
          <Route path="jukbox" element={<Jukbox />} />
          <Route path="playground" element={<Playground />} />
          <Route path="photo" element={<Photo />} />
          <Route path="guestbook" element={<Guestbook />} />
          <Route path="setting" element={<Setting />} />
          <Route path="geolocation" element={<Geolocation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
