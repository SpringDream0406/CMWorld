import "../styles/Jukbox.css";
import { useDispatch } from "react-redux";
import { Utils } from "../utils/utils";
import { IMusicData } from "../interface/music";
import { useParams } from "react-router-dom";
import { playlists } from "../data/musicData";

const JukboxRight = () => {
  const dispatch = useDispatch();
  const { playlist } = useParams();
  const selectedPlaylist = playlist || "total";
  const filteredMusicData = Utils.filterShowMusicData(selectedPlaylist);

  // JukBoxLeft에서 선택 플레이리스트의 뮤직들 랜더링
  const renderMusicData = (data: IMusicData[]) => {
    return (
      <div>
        {data.map((music, index) => (
          <div key={index} className={"music-render"}>
            <div>
              <button onClick={() => Utils.playSong(dispatch, [music])}>
                ▶️
              </button>
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
          <button onClick={() => Utils.playSong(dispatch, filteredMusicData)}>
            <span>
              ▶️ {playlists[selectedPlaylist]} {filteredMusicData.length}곡
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
        <div className="music-row">{renderMusicData(filteredMusicData)}</div>
      </div>
    </div>
  );
};

export default JukboxRight;
