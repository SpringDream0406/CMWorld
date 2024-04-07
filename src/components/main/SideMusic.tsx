import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import "../../styles/SideMusic.css";
import { useSelector } from "react-redux";
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
        // 곡 정보 눌렀을 때 유튜브 창 표시
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
        playerUtils.changeVideoIndex(-1);
        setIsPlayerReady(false);
      },
      icon: faBackwardStep,
      className: "",
    },
    {
      onClick: () => setIsPlaying(false),
      icon: faPause,
      className: isPlaying ? "" : "btn-active",
    },
    {
      onClick: () => setIsPlaying(true),
      icon: faPlay,
      className: isPlaying ? "btn-active" : "",
    },
    {
      onClick: () => {
        playerUtils.changeVideoIndex(1);
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

  const reactPlayer = (
    <ReactPlayer
      className="react-player"
      url={realPlaylist[currentVideoIndex]?.url}
      playing={isPlaying}
      loop={true}
      controls={true}
      volume={volume / 100}
      width={youtubeBoxSize.width}
      height={youTubeVideoSize}
      style={{ borderRadius: "1rem" }}
      playsinline={true}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onReady={() => {
        setIsPlayerReady(true);
        setSongInfo(playerUtils.makeSongInfo());
      }}
      onEnded={() => {
        playerUtils.changeVideoIndex(1);
        setIsPlayerReady(false);
      }}
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
      <div className="sideMusic-reactPlayer-wrapper">{reactPlayer}</div>
    </div>
  );
};

export default SideMusic;
