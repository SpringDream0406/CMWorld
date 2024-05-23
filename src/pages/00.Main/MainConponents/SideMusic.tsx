import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import "../../../styles/SideMusic.css";
import { useSelector } from "react-redux";
import Volume from "./Volume";
import { PlayerUtils } from "../../../utils/playerUtils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utils } from "../../../utils/utils";
import { RootState } from "../../../redux/store";
import { IMusicData } from "../../../interface/music.interface";
import { ISwitch } from "../../../interface/setting.interface";
import { buttonData } from "../../../data/playerBtnData";

const SideMusic = () => {
  const playlist: IMusicData[] = useSelector(
    (state: RootState) => state.music.playMusics // 쥬크박스에서 선택한 노래 담겨있음
  );
  const musicPlayerSetting: ISwitch = useSelector(
    (state: RootState) => state.setting.musicPlayerSetting // 플레이리스트 저장할지 여부
  );
  const [songInfo, setSongInfo] =
    useState<string>("쥬크박스에서 노래를 선택해주세요"); // 플레이어 준비되었을때 세팅됨
  const volume: number = useSelector((state: RootState) => state.music.volume); // Volmue에서 보낸 volum 값 (0~100)
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // 뒤로/앞으로 가기, 곡정보, 재생url 설정 등에 사용
  const [youTubeVideoSize, setYouTubeVideSize] = useState<number>(0); // 유튜브창 열고 닫기용 높이 조절 (0 or 120)
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(true); // 유튜브창 열고 닫기 용
  const [isPlaying, setIsPlaying] = useState<number>(0); // 0: 정지, 1: 재생, 2:로딩
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false); // 버튼 잠금용
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>( // 셔플 기능 on/off
    localStorage.getItem("isShuffleOn") === "true" || false
  );
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]); // 셔플된 playlist 담겨있음
  const [realPlaylist, setRealPlaylist] = useState<IMusicData[]>([]); // 일반 or 셔플 된 playlist 담김
  const youtubeBoxSize = Utils.getSize("music"); // 유튜브 띄우는 창이 속한 div 크기 담김(with, height) => width 가져다 쓸 용도
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex]
  ); // 유튜브 컨트롤 하는데 필요한 것들 만들어둠

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸고, localStorage에 저장하고, 랜덤플레이리스트 한 개 만들기
  useEffect(() => {
    setCurrentVideoIndex(0);
    if (musicPlayerSetting["플레이리스트 저장"]) {
      localStorage.setItem("playlist", JSON.stringify(playlist));
    }
    setShuffledPlaylist(Utils.shufflePlaylist(playlist));
  }, [playlist, musicPlayerSetting]);

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
      {Array.from({ length: 10 }, (_, index) => (
        <div className="flow-wrap" key={index}>
          {songInfo}
        </div>
      ))}
    </div>
  );

  // 플레이어 컨트롤 버튼 랜더링
  const playerControlBtn = buttonData(
    playerUtils,
    setIsPlayerReady,
    setIsPlaying,
    isPlaying,
    setIsShuffleOn,
    isShuffleOn
  ).map(({ onClick, icon, className }, index) => (
    <button
      key={index}
      onClick={onClick}
      disabled={
        // 한곡일 때 disabled 안해주면 잠긴거 해제가 안됨.
        //  => 빠른 곡 변경으로 인한 오류를 막기위해 해당 버튼들 누르면 비활성화 했다가 isPlayerReady true일때 해제되는데 1곡이면 이미 ready상태라 onReady의 콜백이 없음.
        (index === 0 && playlist.length === 1) ||
        (index === 3 && playlist.length === 1) ||
        (index === 4 && playlist.length === 1) ||
        !isPlayerReady
      }
    >
      <FontAwesomeIcon
        icon={icon}
        className={className}
        spin={icon === faSpinner} // 로딩 회전
      />
    </button>
  ));

  // reactPlayer
  const reactPlayer = (
    <ReactPlayer
      className="react-player"
      url={realPlaylist[currentVideoIndex]?.url} // 배열 가능하지만 40개정도만 되도 로딩걸리다 안됨
      playing={!(isPlaying === 0)} // 0: 정지, 1: 재생, 2:로딩
      loop={realPlaylist.length === 1} // 한곡이면 반복
      controls={true} // 유튜브 컨트롤 기능 on/off
      volume={volume / 100} // 0 ~ 1 사이라 /100
      width={youtubeBoxSize.width}
      height={youTubeVideoSize}
      // playsinline={true}
      onPlay={() => setIsPlaying(1)} // double check
      onPause={() => setIsPlaying(0)} // double check
      onReady={() => {
        setIsPlayerReady(true); // 버튼 잠금 해제
        setSongInfo(
          playerUtils.makeSongInfo() || "쥬크박스에서 노래를 선택해주세요"
        ); // 노래 정보 만들어 띄우기
      }}
      onEnded={() => {
        playerUtils.changeVideoIndex(1); // 다음곡 재생
        setIsPlayerReady(false); // 버튼 잠금
      }}
      onBuffer={() => setIsPlaying(3)} // 로딩 중일 때 플레이 버튼 변경
      // https://www.npmjs.com/package/react-player#props
    />
  );

  // 본문
  return (
    <div className="sideMusic">
      <div className="sideMusic-songinfo">{songInfoHTML}</div>
      <div className="sideMusic-mid">
        <div className="sideMusic-control-btn">{playerControlBtn}</div>
      </div>
      <div className="sideMusic-volume">
        <Volume />
      </div>
      <div className="sideMusic-reactPlayer-wrapper">{reactPlayer}</div>
    </div>
  );
};

export default SideMusic;
