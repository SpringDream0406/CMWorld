import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const SideMusic = () => {
  // 플레이리스트와 현재 재생 중인 노래의 인덱스를 상태로 관리합니다.
  const playlist = useSelector((state) => state.checkedMusics);
  console.log(playlist);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 이전 비디오를 재생하는 함수입니다.
  const playPreviousVideo = () => {
    // 플레이리스트의 이전 비디오로 이동합니다.
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // 다음 비디오를 재생하는 함수입니다.
  const playNextVideo = () => {
    // 플레이리스트의 다음 비디오로 이동합니다.
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const playerRef = useRef(null); // YouTube 플레이어의 ref

  const playPauseVideo = async () => {
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

  // YouTube 동영상 플레이어의 설정입니다.
  const opts = {
    height: "100px", // 플레이어의 높이
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
  let time;
  if (playlist.length > 0) {
    title = playlist[currentVideoIndex].title;
    artist = playlist[currentVideoIndex].artist;
    time = playlist[currentVideoIndex].time;
  }

  const musicInfo =
    playlist.length > 0 ? `${title} - ${artist} - ${time}` : "곡정보";
  const showPlayList = (playlist) => {
    return playlist.map((data) => {
      if (data) {
        return <div>{data.title}</div>;
      }
      return null;
    });
  };

  return (
    <div>
      {/* 현재 재생 중인 동영상을 플레이어로 렌더링합니다. */}
      {playlist.length > 0 && playlist[currentVideoIndex] && (
        <YouTube
          videoId={playlist[currentVideoIndex].videoId} // 현재 재생 중인 비디오의 ID를 전달합니다.
          opts={opts} // 플레이어 설정을 전달합니다.
          onEnd={playNextVideo} // 현재 비디오 재생이 끝나면 다음 비디오를 재생합니다.
          ref={playerRef}
        />
      )}
      {musicInfo}
      <br />
      <button onClick={playPreviousVideo}>이전 노래</button>
      <button onClick={playPauseVideo}>
        {playerRef.current &&
        playerRef.current.internalPlayer.getPlayerState() === 1
          ? "일시 정지"
          : "재생"}
      </button>
      <button onClick={playNextVideo}>다음 노래</button>
      <div>{showPlayList(playlist)}</div>
    </div>
  );
};

export default SideMusic;
