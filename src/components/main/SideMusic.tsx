import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/SideMusic.css";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Volume from "./Volume";
import { PlayerUtils } from "../../utils/playerUtils";
import {
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";
import { IMusicData } from "../../interface/music";
import { YoutubeControl } from "../../utils/youtubeControl";
import { ISwitch } from "../../interface/setting";

const SideMusic = () => {
  const playlist: IMusicData[] = useSelector(
    (state: RootState) => state.music.playMusics
  );
  const musicPlayerSetting: ISwitch = useSelector(
    (state: RootState) => state.setting.musicPlayerSetting
  );
  const [songInfo, setSongInfo] = useState<string>();
  const volume: number = useSelector((state: RootState) => state.music.volume);
  const playerRef = useRef<YouTube>(null);
  const [youtubeController, setYoutubeController] = useState<YouTube | null>(
    null
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [youTubeVideoSize, setYouTubeVideSize] = useState<number>(0);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(
    localStorage.getItem("isShuffleOn") === "true" || false
  );
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]);
  const [realPlaylist, setRealPlaylist] = useState<IMusicData[]>([]);
  const youtubeBoxSize = Utils.getSize("music");
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex, setCurrentVideoIndex]
  );

  const youtubeControl = useMemo(
    () => new YoutubeControl(setCurrentVideoIndex, setYoutubeController),
    []
  );

  // 따로 빼려고 했더니 볼륨이 고장나네..
  useEffect(() => {
    if (playerRef.current)
      setYoutubeController(playerRef.current.internalPlayer);
  }, [isPlayerReady, playlist]);

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸고, localStorage에 저장하고, 랜덤플레이리스트 한 개 만들기
  useEffect(() => {
    setCurrentVideoIndex(0);
    if (musicPlayerSetting["플레이리스트 저장"]) {
      localStorage.setItem("playlist", JSON.stringify(playlist));
    }
    setShuffledPlaylist(Utils.shufflePlaylist(playlist));
  }, [playlist]); // 세팅 의존성 설면 세팅 바뀔때마다 노래 변경되어서 안됨.

  // 진짜 플레이 리스트 목록 업데이트 해주기
  useEffect(() => {
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
        youtubeControl.changeVideoIndex(youtubeController, playlist, -1);
        setIsPlayerReady(false);
      },
      icon: faBackwardStep,
      className: "",
    },
    {
      onClick: () => youtubeControl.pause(youtubeController),
      icon: faPause,
      className: isPlaying ? "" : "btn-active",
    },
    {
      onClick: () => youtubeControl.play(youtubeController),
      icon: faPlay,
      className: isPlaying ? "btn-active" : "",
    },
    {
      onClick: () => {
        youtubeControl.changeVideoIndex(youtubeController, playlist, 1);
        setIsPlayerReady(false);
      },
      icon: faForwardStep,
      className: "",
    },
    {
      onClick: () => {
        setIsShuffleOn(!isShuffleOn);
        setIsPlayerReady(false);
        localStorage.setItem("isShuffleOn", String(!isShuffleOn));
      },
      icon: faShuffle,
      className: isShuffleOn ? "btn-active" : "",
    },
  ];

  // 플레이어 컨트롤 버튼 랜더링
  const playerBtn = buttonData.map(({ onClick, icon, className }, index) => (
    <button
      key={index}
      onClick={onClick}
      disabled={
        (index === 0 && playlist.length === 1) ||
        (index === 3 && playlist.length === 1) ||
        (index === 4 && playlist.length === 1) ||
        !isPlayerReady
      }
    >
      <FontAwesomeIcon icon={icon} className={className} />
    </button>
  ));

  // 볼륨컨트롤
  useEffect(() => {
    if (youtubeController) youtubeControl.setVolume(youtubeController, volume);
  }, [volume, youtubeControl, youtubeController, isPlayerReady]);

  // 유튜브
  const opts = {
    height: `${youTubeVideoSize}px`,
    width: youtubeBoxSize ? youtubeBoxSize.width : 0,
    playerVars: {
      autoplay: musicPlayerSetting["자동 재생"] ? 1 : 0,
      controls: 1,
      mute: 0,
    },
  };

  const youtube = realPlaylist && realPlaylist[currentVideoIndex]?.videoId && (
    <YouTube
      className="sideMusic-youtube"
      videoId={realPlaylist[currentVideoIndex].videoId}
      opts={opts}
      onError={(err) => console.log("err", err)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onReady={() => setIsPlaying(false)} // 가끔 제대로 작동 안함
      onStateChange={(state) => {
        if (state.data === 1 || 2) {
          setIsPlayerReady(true);
          setSongInfo(playerUtils.makeSongInfo());
          if (youtubeController)
            youtubeControl.setVolume(youtubeController, volume);
        } else if (state.data === 2) {
          setIsPlaying(false);
        } else {
          setIsPlayerReady(false);
        }
        // console.log("stateChaged", state);
        // 1 –시작되지 않음
        // 0 – 종료
        // 1 – 재생 중
        // 2 – 일시중지
        // 3 – 버퍼링
        // 5 – 동영상 신호
      }} // 상태 따라 버튼 더 다양화 할지 생각 좀 해보기
      onEnd={() =>
        youtubeControl.changeVideoIndex(youtubeController, playlist, 1)
      }
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
