import { useEffect } from "react";
import { playlists } from "../../data/musicData";
import { IMPlaylist } from "../mInterface";

const MPlaylist = ({
  playlistRef,
  seletedPlaylist,
  setSeletedPlaylist,
  setShowPlaylist,
}: IMPlaylist) => {
  //
  // playlist 열렸을 때 현재 playist로 자동 스크롤
  useEffect(() => {
    if (playlistRef.current) {
      const selectedElement = playlistRef.current.querySelector(
        `#m-playlist-${seletedPlaylist}`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [seletedPlaylist, playlistRef]);

  return (
    <div className="m-show-playlist" ref={playlistRef}>
      {Object.entries(playlists).map(([key, value]) => (
        <div
          className="m-showing-playlist"
          id={`m-playlist-${key}`}
          key={key}
          style={key === seletedPlaylist ? { color: "pink" } : {}}
          onClick={() => {
            setSeletedPlaylist(key);
            setShowPlaylist(false);
            localStorage.setItem("m-playlist", key);
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default MPlaylist;
