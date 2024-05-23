import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/00.Main/Main";
import Home from "./pages/01.Home/Home";
import HomeRight from "./pages/01.Home/HomeRight";
import Profile from "./pages/02.Profile/Profile";
import Project from "./pages/03.Project/Project";
import ProjectRight from "./pages/03.Project/ProjectRight";
import Jukbox from "./pages/04.Jukbox/Jukbox";
import Playground from "./pages/05.Playground/Playground";
import Photo from "./pages/06.Photo/Photo";
import Guestbook from "./pages/07.Guestbook/Guestbook";
import Setting from "./pages/08.Setting/Setting";
import MusicPlayerSetting from "./pages/08.Setting/SettingConponents/MusicPlayerSetting";
import Geolocation from "./pages/Geolocation";
import NotFound from "./pages/NotFound";
import MobileMusic from "./mobile/MobileMusic";

function App() {
  //
  const isMobile =
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 480;
  if (isMobile)
    return (
      <div>
        <MobileMusic />
      </div>
    );

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />}>
            <Route path=":notice" element={<HomeRight />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="project" element={<Project />}>
            <Route path=":category" element={<ProjectRight />} />
          </Route>
          <Route path="jukbox" element={<Jukbox />}>
            <Route path=":playlist" element={<Jukbox />} />
          </Route>
          <Route path="playground" element={<Playground />} />
          <Route path="photo" element={<Photo />} />
          <Route path="guestbook" element={<Guestbook />} />
          <Route path="setting" element={<Setting />}>
            <Route index element={<Navigate to="musicplayer" />} />
            <Route path="musicplayer" element={<MusicPlayerSetting />} />
          </Route>
          <Route path="geolocation" element={<Geolocation />} />
          <Route path="music" element={<MobileMusic />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
