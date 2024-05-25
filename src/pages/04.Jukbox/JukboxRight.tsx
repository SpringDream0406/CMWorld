import "../../styles/Jukbox.css";
import { useDispatch } from "react-redux";
import { Utils } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { playlists } from "../../data/musicData";
import { LsUtils } from "../../utils/lsUtils";

const JukboxRight = () => {
  const dispatch = useDispatch();
  const { playlist } = useParams();
  const selectedPlaylist = playlist || "Total";
  const filteredMusicData = Utils.filterShowMusicData(selectedPlaylist);

  // 선택된 플레이리스트에 해당되는 데이터 랜더링
  const renderMusicData = (
    <div>
      {filteredMusicData.map((music, index) => (
        <div key={index} className={"music-render"}>
          <div>
            <button
              className="music-render-btn"
              onClick={() => {
                Utils.setPlayMusics(dispatch, [music]);
                LsUtils.resetLastMusicIndex();
              }}
            >
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
  // 본문
  return (
    <div className="jukboxRight">
      <div className="music__table">
        <div className="music-play-all">
          <button
            onClick={() => {
              LsUtils.resetLastMusicIndex();
              Utils.setSelectPlaylist(dispatch, selectedPlaylist);
            }}
          >
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
        <div className="music-row">{renderMusicData}</div>
      </div>
    </div>
  );
};

export default JukboxRight;
