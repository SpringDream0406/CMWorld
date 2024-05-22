import "./MobileMusic.css";

const MobileMusic = () => {
  return (
    <div className="mobile-music">
      <div className="top">
        <div className="playing-list">plaing</div>
        <div className="cm-music">CM Music</div>
        <div className="volume">volume</div>
      </div>
      <div className="body">
        <div className="song-info">
          <div className="img">이미지</div>
          <div className="title">
            Rise fea. The Glitch Mob & Mako & The Word Alive
          </div>
          <div className="artist">가수</div>
        </div>
        <div className="controls">
          <div className="play-bar">play-bar</div>
          <div className="btns">btn</div>
        </div>
      </div>
      <div className="footer">
        <div className="info">모바일의 경우 뮤직플레이어만 지원합니다.</div>
      </div>
      {/* <div className="volumebg">
        <span className="bar"></span>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          step="1"
          className="volumerange"
        />
      </div> */}
    </div>
  );
};

export default MobileMusic;
