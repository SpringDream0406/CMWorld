import React, { useState } from "react";
import YouTube from "react-youtube";

const SideMusic = () => {
  // 플레이리스트와 현재 재생 중인 노래의 인덱스를 상태로 관리합니다.
  const [playlist, setPlaylist] = useState([
    "dYIT_jeUBKg",
    "NIPtyAKxlRs",
    // 필요한 만큼 더 많은 비디오 ID를 추가합니다.
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 다음 비디오를 재생하는 함수입니다.
  const playNextVideo = () => {
    // 플레이리스트의 다음 비디오로 이동합니다.
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // YouTube 동영상 플레이어의 설정입니다.
  const opts = {
    height: "200px", // 플레이어의 높이
    width: "300px", // 플레이어의 너비
    playerVars: {
      autoplay: 1, // 자동 재생 설정 (1: 자동 재생)
      volume: 0, // 음소거로 설정
      controls: 1,
    },
  };

  return (
    <div>
      {/* 현재 재생 중인 동영상을 플레이어로 렌더링합니다. */}
      <YouTube
        videoId={playlist[currentVideoIndex]} // 현재 재생 중인 비디오의 ID를 전달합니다.
        opts={opts} // 플레이어 설정을 전달합니다.
        onEnd={playNextVideo} // 현재 비디오 재생이 끝나면 다음 비디오를 재생합니다.
      />
    </div>
  );
};

export default SideMusic;
