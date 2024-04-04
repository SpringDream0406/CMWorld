import React from "react";
import "../../../styles/Jukbox.css";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../../utils/utils";

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
            <div>{Utils.ellipsisText(music.title, 48)}</div>
            <div>{Utils.ellipsisText(music.artist, 27)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="jukboxRight">
      <div className="music__table">
        <div className="music-play-all">
          <button onClick={() => playOneSong(musicData)}>
            <span>
              ▶️ {selectedPlaylist} {musicData.length}곡
            </span>
            <span></span>
          </button>
        </div>
        <div className="music-row-header">
          <div className="music-render">
            <div></div>
            <div>번호</div>
            <div>곡명</div>
            <div>아티스트</div>
          </div>
        </div>
        <div className="music-row">{renderMusicData(musicData)}</div>
      </div>
    </div>
  );
};

export default JukboxRight;
