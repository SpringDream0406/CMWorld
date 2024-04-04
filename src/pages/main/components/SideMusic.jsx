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
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utils } from "../../../utils/utils";

const SideMusic = () => {
  const playlist = useSelector((state) => state.music.playMusics);
  const [songInfo, setSongInfo] = useState();
  const volume = useSelector((state) => state.music.volume);
  const playerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [youTubeVideoSize, setYouTubeVideSize] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(
    localStorage.getItem("isShuffleOn") === true ? true : false
  );
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [realPlaylist, setRealPlaylist] = useState();
  const youtubeBoxSize = Utils.getSize("music");
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex, setCurrentVideoIndex]
  );

  console.log(playlist);

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸고, localStorage에 저장하기
  useEffect(() => {
    setCurrentVideoIndex(0);
    localStorage.setItem("playlist", JSON.stringify(playlist));
    setRealPlaylist(isShuffleOn ? shuffledPlaylist : playlist);
  }, [playlist, isShuffleOn, shuffledPlaylist]);

  // 곡 정보 HTML
  const songInfoHTML = (
    <div
      className="flow-text"
      onClick={() => {
        playerUtils.openVideo(setYouTubeVideSize, setIsVideoOpen, isVideoOpen);
      }}
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div className="flow-wrap" key={index}>
          {songInfo}
        </div>
      ))}
    </div>
  );

  // 플레이어 컨트롤 버튼 랜더링할 데이터
  const buttonData = [
    {
      onClick: () => {
        playerUtils.changeVideoIndex(playerRef, -1);
        setIsPlayerReady(false);
      },
      icon: faBackwardStep,
      className: "",
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
      className: "",
    },
    {
      onClick: () => {
        setIsShuffleOn(!isShuffleOn);
        setShuffledPlaylist(Utils.shufflePlaylist(playlist));
      },
      icon: faShuffle,
      className: isShuffleOn ? "btn-active" : "",
    },
  ];

  // 플레이어 컨트롤 버튼 랜더링
  const playerBtn = buttonData.map(({ onClick, icon, className }, index) => (
    <button key={index} onClick={onClick} disabled={!isPlayerReady}>
      <FontAwesomeIcon icon={icon} className={className} />
    </button>
  ));

  // 볼륨컨트롤
  useEffect(() => {
    if (playerRef.current) {
      playerUtils.setVolume(playerRef, volume);
    }
  }, [volume, playerUtils, isPlayerReady]);

  // 유튜브
  const opts = {
    height: `${youTubeVideoSize}px`,
    width: youtubeBoxSize ? youtubeBoxSize.width : 0,
    playerVars: {
      autoplay: 1,
      controls: 1,
      mute: 0,
    },
  };

  const youtube = realPlaylist && realPlaylist[currentVideoIndex]?.videoId && (
    <YouTube
      className="sideMusic-youtube"
      videoId={realPlaylist[currentVideoIndex].videoId}
      opts={opts}
      onError={(err) => console.log(err)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onReady={() => {
        setIsPlayerReady(true);
        setSongInfo(playerUtils.makeSongInfo());
      }}
      // onStateChange={(e) => console.log(e)} 상태 따라 버튼 더 다양화 할지 생각 좀 해보고
      onEnd={() => playerUtils.changeVideoIndex(playerRef, 1)}
      ref={playerRef}
    />
  );

  // 본문
  return (
    <div className="sideMusic">
      <div className="sideMusic-songinfo">{songInfoHTML}</div>
      <div className="sideMusic-mid">
        <div className="sideMusic-control-btn">{playerBtn}</div>
      </div>
      <div className="sideMusic-volume">
        <Volume />
      </div>
      <div className="sideMusic-youtube-wrapper">{youtube}</div>
    </div>
  );
};

export default SideMusic;
