import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlists, musicData } from "../../../musicData";
import { musicActions } from "../../../redux/reducer";

const JukboxLeft = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector((state) => state.music.selectedPlaylist);

  // JukBoxRight에 보여줄 노래들 보내기
  const filterShowData = (playlistName) => {
    dispatch(musicActions.setSelectedPlaylist(playlistName));
    if (playlistName === "음악 전체 보기") {
      dispatch(musicActions.setMusicData(musicData));
      return;
    }
    const filteredMusic = musicData.filter((music) =>
      music.playlists.includes(playlistName)
    );
    dispatch(musicActions.setMusicData(filteredMusic));
  };

  // 플레이리스트 가져다 랜더링
  const playListRender = (playlists) => {
    return playlists.map((menu, index) => (
      <span
        key={index}
        onClick={() => filterShowData(menu)}
        className={"playlistName"}
        style={{
          backgroundColor:
            selectedPlaylist === menu ? "lightblue" : "transparent",
        }}
      >
        {menu}
      </span>
    ));
  };

  // 본문
  return <div className="jukboxLeft">{playListRender(playlists)}</div>;
};

export default JukboxLeft;
