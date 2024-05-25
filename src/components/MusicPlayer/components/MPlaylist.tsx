import { useEffect } from "react";
import { playlists } from "../../../data/musicData";
import { IMPlaylist } from "../../../interface/musicPlayer.Interface";
import { LsUtils } from "../../../utils/lsUtils";

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

  // 본문
  return (
    <div className="m-show-playlist" ref={playlistRef}>
      {Object.entries(playlists).map(([key, value]) => (
        <div
          className="m-showing-playlist"
          id={`m-playlist-${key}`}
          key={key}
          style={key === seletedPlaylist ? { color: "pink" } : {}}
          onClick={() => {
            setSeletedPlaylist(key); // 선택된 플레이리스트 넣기
            setShowPlaylist(false); // 플레이리스트 닫기
            LsUtils.setPlaylistCategory(key); // 로컬에 playlist 저장하기
            LsUtils.resetLastMusicIndex(); // index값 초기화
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default MPlaylist;
