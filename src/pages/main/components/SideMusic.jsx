import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { SideMusicUtils } from "../../../utils/sideMusic";
import { isEmptyObject } from "../../../utils/isEmptyObject";

const SideMusic = () => {
  const [totalTime, setTotalTime] = useState();
  const [playingTime, setPlayingTime] = useState();
  // const sideMusicUtils = new SideMusicUtils();

  // 플레이리스트와 현재 재생 중인 노래의 인덱스를 상태로 관리합니다.
  const playlist = useSelector((state) => state.playMusics);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 이전 비디오를 재생하는 함수입니다.
  const playPreviousVideo = () =>
    SideMusicUtils.playPreviousVideo(
      currentVideoIndex,
      playlist.length,
      setCurrentVideoIndex
    );
  // const playPreviousVideo = () => {
  //   // 플레이리스트의 이전 비디오로 이동합니다.
  //   setCurrentVideoIndex((prevIndex) =>
  //     prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
  //   );
  // };

  // 다음 비디오를 재생하는 함수입니다.
  const playNextVideo = () => {
    // 플레이리스트의 다음 비디오로 이동합니다.
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const playerRef = useRef(null); // YouTube 플레이어의 ref

  const playPauseVideo = async () => {
    console.log(playerRef);
    if (playerRef.current) {
      // 연결됨
      const playerControl = playerRef.current.internalPlayer;
      const playerState = await playerControl.getPlayerState();
      if (playerState === 1) {
        console.log("중지");
        playerControl.pauseVideo();
      } else {
        playerControl.playVideo();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const playerControl = playerRef.current.internalPlayer;
        const duration = await playerControl.getDuration();
        const currentTime = await playerControl.getCurrentTime();
        setTotalTime(SideMusicUtils.formatTime(duration));
        setPlayingTime(SideMusicUtils.formatTime(currentTime));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playlist, currentVideoIndex]);

  // YouTube 동영상 플레이어의 설정입니다.
  const opts = {
    height: "00px", // 플레이어의 높이
    width: "200px", // 플레이어의 너비
    playerVars: {
      autoplay: 1, // 자동 재생 설정 (1: 자동 재생)
      controls: 1,
      volume: 1,
      mute: 0,
    },
  };

  let title;
  let artist;
  if (!isEmptyObject(playlist)) {
    title = playlist[currentVideoIndex].title;
    artist = playlist[currentVideoIndex].artist;
  }

  return (
    <div>
      {/* 현재 재생 중인 동영상을 플레이어로 렌더링합니다. */}
      {playlist && playlist[currentVideoIndex]?.videoId && (
        <YouTube
          videoId={playlist[currentVideoIndex].videoId} // 현재 재생 중인 비디오의 ID를 전달합니다.
          opts={opts} // 플레이어 설정을 전달합니다.
          onEnd={playNextVideo} // 현재 비디오 재생이 끝나면 다음 비디오를 재생합니다.
          ref={playerRef}
        />
      )}
      <div className="musicInfo">
        <div className="title">{title}</div>
        <div>{artist}</div>
        <div>
          {playingTime} - {totalTime}
        </div>
      </div>
      <br />
      <button onClick={playPreviousVideo}>이전 노래</button>
      <button onClick={playPauseVideo}>
        {playerRef.current &&
        playerRef.current.internalPlayer.getPlayerState() === 1
          ? "일시 정지"
          : "재생"}
      </button>
      <button onClick={playNextVideo}>다음 노래</button>
    </div>
  );
};

export default SideMusic;
