import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../styles/SideMusic.css";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Volume from "./Volume";
import { PlayerUtils } from "../../../utils/playerUtils";
import {
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utils } from "../../../utils/utils";

const SideMusic = () => {
  const playlist = useSelector((state) => state.playMusics);
  const [songInfo, setSongInfo] = useState();
  const volume = useSelector((state) => state.volume);
  const playerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [youTubeVideoSize, setYouTubeVideSize] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(
        playlist,
        currentVideoIndex,
        setCurrentVideoIndex,
        setIsVideoOpen
      ),
    [playlist, currentVideoIndex, setCurrentVideoIndex, setIsVideoOpen]
  );
  const youtubeBoxSize = Utils.getSize("music");

  // 유튜브 창 설정
  const opts = {
    height: `${youTubeVideoSize}px`,
    width: youtubeBoxSize ? youtubeBoxSize.width : 0,
    playerVars: {
      autoplay: 1,
      controls: 1,
      mute: 0,
    },
  };

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸기
  useEffect(() => {
    setCurrentVideoIndex(0);
  }, [playlist]);

  // 볼륨컨트롤 지금은 isPlayerReady로 통일설 맞추고 있는데, localStorage의 유튜브뮤직꺼 건들게 되면 내용바뀔듯
  useEffect(() => {
    if (playerRef.current) {
      playerUtils.setVolume(playerRef, volume);
    }
  }, [volume, playerUtils, isPlayerReady]);

  // 플레이어 컨트롤 버튼들 랜더링할 데이터
  const buttonData = [
    {
      onClick: () => {
        playerUtils.changeVideoIndex(playerRef, -1);
        setIsPlayerReady(false);
      },
      icon: faBackwardStep,
      className: "backward-button",
    },
    {
      onClick: () => playerUtils.pauseVideo(playerRef),
      icon: faPause,
      className: isPlaying ? "" : "btn-active",
    },
    {
      onClick: () => playerUtils.playVideo(playerRef),
      icon: faPlay,
      className: isPlaying ? "btn-active" : "",
    },
    {
      onClick: () => {
        playerUtils.changeVideoIndex(playerRef, 1);
        setIsPlayerReady(false);
      },
      icon: faForwardStep,
      className: "forward-button",
    },
  ];

  return (
    <div className="sideMusic">
      <div className="flow-container">
        <div
          className="flow-text"
          onClick={() => {
            playerUtils.openVideo(
              setYouTubeVideSize,
              setIsVideoOpen,
              isVideoOpen
            );
          }}
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div className="flow-wrap" key={index}>
              {songInfo}
            </div>
          ))}
        </div>
      </div>
      <div className="sideMusic-mid">
        <div className="sideMusic-control-btn">
          {buttonData.map(({ onClick, icon, className }, index) => (
            <button key={index} onClick={onClick} disabled={!isPlayerReady}>
              <FontAwesomeIcon icon={icon} className={className} />
            </button>
          ))}
        </div>
      </div>
      <div className="sideMusic-volume">
        <Volume />
      </div>

      <div className="sideMusic-youtube-wrapper">
        {playlist && playlist[currentVideoIndex]?.videoId && (
          <YouTube
            className="sideMusic-youtube"
            videoId={playlist[currentVideoIndex].videoId}
            opts={opts}
            onError={(err) => console.log(err)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReady={() => {
              setIsPlayerReady(true);
              setSongInfo(playerUtils.makeSoingInfo());
            }}
            onStateChange={(e) => console.log(e)}
            onEnd={() => playerUtils.changeVideoIndex(playerRef, 1)}
            ref={playerRef}
          />
        )}
      </div>
    </div>
  );
};

export default SideMusic;
