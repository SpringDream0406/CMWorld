import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import TeamProject from "./components/project/TeamProject";
import PersonalProject from "./components/project/PersonalProject";
import Jukbox from "./pages/Jukbox";
import Playground from "./pages/Playground";
import Photo from "./pages/Photo";
import Guestbook from "./pages/Guestbook";
import Setting from "./pages/Setting";
import MusicPlayerSetting from "./components/setting/MusicPlayerSetting";
import Geolocation from "./pages/Geolocation";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="project" element={<Project />}>
            <Route index element={<Navigate to="team" />} />
            <Route path="team" element={<TeamProject />} />
            <Route path="personal" element={<PersonalProject />} />
          </Route>
          <Route path="jukbox" element={<Jukbox />} />
          <Route path="playground" element={<Playground />} />
          <Route path="photo" element={<Photo />} />
          <Route path="guestbook" element={<Guestbook />} />
          <Route path="setting" element={<Setting />}>
            <Route index element={<Navigate to="musicplayer" />} />
            <Route path="musicplayer" element={<MusicPlayerSetting />} />
          </Route>
          <Route path="geolocation" element={<Geolocation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
