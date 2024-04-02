import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { SideMusicUtils, PlayerControlBtn } from "../../../utils/sideMusic";

const SideMusic = () => {
  const playlist = useSelector((state) => state.playMusics);
  const playerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [totalTime, setTotalTime] = useState();
  const [playingTime, setPlayingTime] = useState();
  const [youTubeVideoSize, setYouTubeVideSize] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(true);
  // const [playerControl, setPlayerControl] = useState();
  const sideMusicUtils = useMemo(() => new SideMusicUtils(), []);
  const playerControlBtn = useMemo(() => new PlayerControlBtn(), []);

  // YouTube 동영상 플레이어의 설정
  const opts = {
    height: `${youTubeVideoSize}px`,
    width: "200px",
    playerVars: {
      autoplay: 1,
      controls: 1,
      mute: 0,
      volume: 0, // 안먹힘
    },
  };

  // useEffect(() => {
  //   if (playerRef.current && playerRef.current.internalPlayer) {
  //     setPlayerControl(playerRef.current.internalPlayer);
  //     console.log("연결됨");
  //   }
  // }, [playerRef.current]);

  const songInfo = sideMusicUtils.makeSoingInfo(playlist, currentVideoIndex);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const playerControl = playerRef.current.internalPlayer;
        sideMusicUtils.duration(playerControl, setTotalTime, setPlayingTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playlist, currentVideoIndex, sideMusicUtils]);

  const playPreviousVideo = () =>
    playerControlBtn.playPreviousVideo(playlist.length, setCurrentVideoIndex);

  const playNextVideo = () => {
    playerControlBtn.playNextVideo(playlist.length, setCurrentVideoIndex);
  };

  const playVideo = () => {
    if (playerRef.current) {
      const playerControl = playerRef.current.internalPlayer;
      console.log("재생");
      playerControlBtn.playVideo(playerControl);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      const playerControl = playerRef.current.internalPlayer;
      console.log("정지");
      playerControlBtn.pauseVideo(playerControl);
    }
  };

  const openVideo = () =>
    playerControlBtn.openVideo(setYouTubeVideSize, setIsVideoOpen, isVideoOpen);

  return (
    <div className="sideMusic">
      <div className="sideMusic-music-info">
        <div className="sideMusic-title">
          {/* <div className="slide-text"> */}
          {songInfo}
          {/* </div> */}
        </div>
        <div className="sideMusic-time">
          {playingTime} - {totalTime}
        </div>
      </div>
      <div className="sideMusic-control-btn">
        <button onClick={playPreviousVideo}>이전 노래</button>
        <button onClick={pauseVideo}>{"정지"}</button>
        <button onClick={playVideo}>{"재생"}</button>
        <button onClick={playNextVideo}>다음 노래</button>
        <button onClick={openVideo}>open</button>
      </div>
      <div className="sideMusic-youtube">
        {playlist && playlist[currentVideoIndex]?.videoId && (
          <YouTube
            videoId={playlist[currentVideoIndex].videoId}
            opts={opts}
            onEnd={playNextVideo}
            ref={playerRef}
          />
        )}
      </div>
    </div>
  );
};

export default SideMusic;
