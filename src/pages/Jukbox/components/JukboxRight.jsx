import React from "react";
import "../../../styles/Jukbox.css";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../../utils/utils";
import { musicActions } from "../../../redux/reducer";

const JukboxRight = () => {
  const dispatch = useDispatch();
  const musicData = useSelector((state) => state.music.musicData);
  const selectedPlaylist = useSelector((state) => state.music.selectedPlaylist);

  // 플레이 버튼들 동작
  const playSong = (music) => {
    dispatch(musicActions.setPlayMusics(music));
  };

  // JukBoxLeft에서 선택 플레이리스트의 뮤직들 랜더링
  const renderMusicData = (data) => {
    return (
      <div>
        {data.map((music, index) => (
          <div key={index} className={"music-render"}>
            <div>
              <button onClick={() => playSong([music])}>▶️</button>
            </div>
            <div>{index + 1}</div>
            <div>{Utils.ellipsisText(music.title, 48)}</div>
            <div>{Utils.ellipsisText(music.artist, 27)}</div>
          </div>
        ))}
      </div>
    );
  };

  // 본문
  return (
    <div className="jukboxRight">
      <div className="music__table">
        <div className="music-play-all">
          <button onClick={() => playSong(musicData)}>
            <span>
              ▶️ {selectedPlaylist} {musicData.length}곡
            </span>
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
