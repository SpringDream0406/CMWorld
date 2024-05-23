import ReactPlayer from "react-player";
import "./MobileMusic.css";

const MobileMusic = () => {
  return (
    <div className="mobile-music">
      <div className="top">
        <div className="playing-list">plaing</div>
        <div className="cm-music">CM Music</div>
        <div className="volume">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="30"
            step="1"
            className="volumerange"
          />
        </div>
      </div>
      <div className="body">
        <div className="song-info">
          <div className="img">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ZlJNkflJjA4"
              controls={false}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="title">
            Rise fea. The Glitch Mob & Mako & The Word Alive
          </div>
          <div className="artist">Duke & Jones & Louis Therou</div>
        </div>
        <div className="controls">
          <div className="play-bar">
            <div className="time-start">00:00</div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              step="1"
              className="play-bar-range"
            />
            <div className="time-end">04:30</div>
          </div>
          <div className="btns">ㅁ ㅇ ㄴ </div>
        </div>
      </div>
      <div className="footer">
        <div className="info">모바일의 경우 뮤직플레이어만 지원합니다.</div>
      </div>
    </div>
  );
};

export default MobileMusic;
