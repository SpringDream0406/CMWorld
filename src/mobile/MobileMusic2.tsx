import "../styles/MobileMusic.css";
import { useState } from "react";

// React 컴포넌트 정의
const MusicPlayer = () => {
  const [isPlaylistVisible, setPlaylistVisible] = useState(false);
  const [isVolumeControlVisible, setVolumeControlVisible] = useState(false);

  const togglePlaylist = () => {
    setPlaylistVisible(!isPlaylistVisible);
  };

  const toggleVolumeControl = () => {
    setVolumeControlVisible(!isVolumeControlVisible);
  };

  return (
    <div className="wrapper">
      <div className="bg">
        <div className="inner">
          <div className="play-header">
            <div className="m-top">
              <h2>Music Player</h2>
              <span
                id="toggle-btn"
                className="material-symbols-rounded"
                onClick={togglePlaylist}
              >
                {isPlaylistVisible ? "expand_less" : "expand_more"}
              </span>
            </div>
          </div>
          <div className="play-body">
            <div className="img_info_wrap">
              <div className="m-img">
                <img src="images/album1.jpg" alt="앨범1" />
              </div>
              <div className="m-info">
                <p className="name">Alone</p>
                <p className="artist">Color Out</p>
              </div>
              <div className="m-lyrics"></div>
            </div>
            <div className="m-etc">
              <span
                id="list-btn"
                className="material-symbols-rounded"
                onClick={togglePlaylist}
              >
                queue_music
              </span>
              <div
                id="play-list"
                style={{ display: isPlaylistVisible ? "block" : "none" }}
              >
                <ul></ul>
              </div>
              <span id="favorite-btn"></span>
              <div className="volume">
                <span
                  id="volume-btn"
                  className="material-symbols-rounded"
                  onClick={toggleVolumeControl}
                >
                  volume_up
                </span>
                <div
                  id="volume-ctrl"
                  className={isVolumeControlVisible ? "" : "hidden"}
                >
                  <div className="volumebg">
                    <span className="bar"></span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      step="1"
                      className="volumerange"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-progress">
              <div className="bar">
                <span className="pin"></span>
                <audio src="" id="main-audio"></audio>
              </div>
              <div className="timer">
                <span className="current">0:00</span>
                <span className="duration">0:00</span>
              </div>
            </div>
            <div className="m-control">
              <span id="shuffle-btn" className="material-symbols-rounded">
                shuffle
              </span>
              <span id="prev-btn" className="material-symbols-rounded">
                skip_previous
              </span>
              <div className="play-pause">
                <span id="play-btn" className="material-symbols-rounded">
                  play_arrow
                </span>
              </div>
              <span id="next-btn" className="material-symbols-rounded">
                skip_next
              </span>
              <span id="repeat-btn" className="material-symbols-rounded">
                repeat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
