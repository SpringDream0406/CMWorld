import React from "react";
import "../../../styles/Jukbox.css";
import { useDispatch, useSelector } from "react-redux";

const JukboxRight = () => {
  const dispatch = useDispatch();
  const musicData = useSelector((state) => state.musicData);
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist);

  const playOneSong = (music) => {
    dispatch({ type: "PLAYMUSICS", payload: music });
  };

  const renderMusicData = (data) => {
    return (
      <div>
        {data.map((music, index) => (
          <div key={index} className={"music-render"}>
            <div>
              <button onClick={() => playOneSong([music])}>▶️</button>
            </div>
            <div>{index + 1}</div>
            <div>{music.title}</div>
            <div>{music.artist}</div>
            <div>{music.time}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="jukboxRight">
      <div className="music__table">
        <div className="music-play-all">
          <span>{selectedPlaylist}</span>
          <span>{musicData.length} </span>
          <span>곡 전체 플레이하기</span>
          <button onClick={() => playOneSong(musicData)}>play</button>
        </div>
        <div className="music-row-header">
          <div className="music-render">
            <div></div>
            <div>번호</div>
            <div>곡명</div>
            <div>아티스트</div>
            <div>시간</div>
          </div>
        </div>
        <div className="music-row">{renderMusicData(musicData)}</div>
      </div>
    </div>
  );
};

export default JukboxRight;
