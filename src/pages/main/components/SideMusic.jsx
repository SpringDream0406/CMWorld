import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../styles/SideMusic.css";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Volume from "./Volume";
import { SideMusicUtils, PlayerControlBtn } from "../../../utils/sideMusic";
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
  const volume = useSelector((state) => state.volume);
  const playerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [totalTime, setTotalTime] = useState("0:00");
  const [playingTime, setPlayingTime] = useState("0:00");
  const [youTubeVideoSize, setYouTubeVideSize] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const sideMusicUtils = useMemo(() => new SideMusicUtils(), []);
  const playerControlBtn = useMemo(() => new PlayerControlBtn(), []);
  const utils = new Utils();
  const size = utils.getSize("music");

  const opts = {
    height: `${youTubeVideoSize}px`,
    width: size ? size.width : 0,
    playerVars: {
      autoplay: 1,
      controls: 1,
      mute: 0,
    },
  };

  const songInfo = sideMusicUtils.makeSoingInfo(playlist, currentVideoIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const playerControl = sideMusicUtils.getControl(playerRef);
        sideMusicUtils.duration(playerControl, setTotalTime, setPlayingTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playlist, currentVideoIndex, sideMusicUtils]);

  const playPreviousVideo = () =>
    playerControlBtn.playPreviousVideo(playlist.length, setCurrentVideoIndex);

  const playNextVideo = () => {
    playerControlBtn.playNextVideo(playlist.length, setCurrentVideoIndex);
    if (currentVideoIndex === 0 && playerRef.current) {
      const playerControl = sideMusicUtils.getControl(playerRef);
      playerControl.playVideo();
    }
  };

  const playVideo = () => {
    if (playerRef.current) {
      const playerControl = sideMusicUtils.getControl(playerRef);
      playerControl.playVideo();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      const playerControl = sideMusicUtils.getControl(playerRef);
      playerControl.pauseVideo();
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    if (playerRef.current) {
      const playerControl = sideMusicUtils.getControl(playerRef);
      playerControl.setVolume(volume);
    }
  }, [volume, sideMusicUtils]);

  const openVideo = () => {
    playerControlBtn.openVideo(setYouTubeVideSize, setIsVideoOpen, isVideoOpen);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const playerControl = sideMusicUtils.getControl(playerRef);
        const playerState = await playerControl.getPlayerState();
        setIsPlaying(playerState === 1 ? true : false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, sideMusicUtils]);

  return (
    <div className="sideMusic">
      <div className="flow-container">
        <div className="flow-text" onClick={openVideo}>
          <div className="flow-wrap">{songInfo}</div>
          <div className="flow-wrap">{songInfo}</div>
          <div className="flow-wrap">{songInfo}</div>
          <div className="flow-wrap">{songInfo}</div>
        </div>
      </div>
      <div className="sideMusic-mid">
        <div className="sideMusic-time">
          <div className="playingTime">{playingTime}</div>
          <div className="">-</div>
          <div className="totalTime">{totalTime}</div>
        </div>
        <div className="sideMusic-control-btn">
          <button onClick={playPreviousVideo}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button onClick={pauseVideo}>
            <FontAwesomeIcon
              icon={faPause}
              className={isPlaying ? "" : "btn-active"}
            />
          </button>
          <button onClick={playVideo}>
            <FontAwesomeIcon
              icon={faPlay}
              className={isPlaying ? "btn-active" : ""}
            />
          </button>
          <button onClick={playNextVideo}>
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
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
            onEnd={playNextVideo}
            ref={playerRef}
          />
        )}
      </div>
    </div>
  );
};

export default SideMusic;
