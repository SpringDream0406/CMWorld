import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "../../styles/MusicPlayer.css";
import { useDispatch, useSelector } from "react-redux";
import Volume from "../../pages/00.Main/MainConponents/Volume";
import { PlayerUtils } from "../../utils/playerUtils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";
import { IMusicData } from "../../interface/music.interface";
import { buttonData } from "../../data/playerBtnData";
import { LsUtils } from "../../utils/lsUtils";
import MNotice from "./components/MNotice";
import MPlaylist from "./components/MPlaylist";
import MPlayingList from "./components/MPlayingList";
import MPlayerBar from "./components/MPlayerBar";
import { useLocation } from "react-router-dom";

const SideMusic = () => {
  // 플레이어 용인데 songInfo 띄우는것 때문에 위에 배치함
  const location = useLocation();
  const currentPath = location.pathname; // 현재 경로
  const isMusicPlayer = currentPath === "/musicplayer"; // 경로 비교
  const isMobile = Utils.isMobile(); // 모바일인지 확인
  const isPlayer = isMobile || isMusicPlayer; // 플레이어 전용인지 체크

  const dispatch = useDispatch();
  const playlist: IMusicData[] = useSelector(
    (state: RootState) => state.music.playMusics
  ); // 쥬크박스에서 선택한 노래 담겨있음
  const seletedPlaylist: string = useSelector(
    (state: RootState) => state.music.playlistCategory
  ); // 선택된 플레이 리스트, 초기값은 로컬 값
  const [songInfo, setSongInfo] = useState<string>(
    isPlayer
      ? "CM Music을 눌러 플레이리스트를 선택해주세요."
      : "쥬크박스에서 노래를 선택해주세요"
  ); // 플레이어 준비되었을때 세팅됨
  const volume: number = useSelector((state: RootState) => state.music.volume); // Volmue에서 보낸 volum 값 (0~100)
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // 뒤로/앞으로 가기, 곡정보, 재생url 설정 등에 사용
  const [youTubeVideoSize, setYouTubeVideSize] = useState<number>(0); // 유튜브창 열고 닫기용 높이 조절 (0 or 120)
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(true); // 유튜브창 열고 닫기 용
  const [isPlaying, setIsPlaying] = useState<number>(0); // 0: 정지, 1: 재생, 2:로딩
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false); // 버튼 잠금용
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>( // 셔플 기능 on/off
    LsUtils.getIsShuffleOn()
  );
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]); // 셔플된 playlist 담겨있음
  const [realPlaylist, setRealPlaylist] = useState<IMusicData[]>([]); // 일반 or 셔플 된 playlist 담김
  const youtubeBoxSize = Utils.getSize("music"); // 유튜브 띄우는 창이 속한 div 크기 담김(with, height) => width 가져다 쓸 용도
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex]
  ); // 플레이어 컨트롤 하는데 필요한 것들 만들어둠

  // =============== 플레이어 용 =============== //
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false); // 플레이 리스트 보여주기
  const [showPlayingList, setShowPlayingList] = useState<boolean>(false); // 플레잉 리스트 보여주기
  const [songTitle, setSongTitle] = useState<string>(""); // 제목
  const [songArtist, setSongArtist] = useState<string>(""); // 가수
  const [repeat, setRepeat] = useState<boolean>(false); // 한곡 반복
  const [played, setPlayed] = useState<number>(0); // 곡 재생된 비율
  const [playedSeconds, setPlayedSeconds] = useState<number>(0); // 곡 재생된 초
  const [duration, setDuration] = useState<string>("00:00"); // 곡 총 시간
  const playerRef = useRef<ReactPlayer | null>(null); // 플레이어 컨트롤 Ref
  const playlistRef = useRef<HTMLDivElement>(null); // 플레이 리스트 Ref
  const playingListRef = useRef<HTMLDivElement>(null); // 플레잉 리스트 Ref
  const musicPlayerIconsRoot = "images/musicPlayerIcons/";

  // 플레이어 왼쪽 상단의 한곡 반복 아이콘
  const repeatIcon = (
    <img
      onClick={() => {
        setRepeat(!repeat);
      }}
      className="repeat-icon"
      src={`${musicPlayerIconsRoot}${repeat ? "repeat-one" : "repeat2"}.png`}
      alt="playinglist"
    />
  );

  // 플레이어 중앙 상단의 CM Music
  const cmMusic = (
    <div
      className="cm-music-txt"
      style={isMobile ? { fontSize: "2rem" } : {}}
      onClick={() => {
        setShowPlaylist(!showPlaylist);
        setShowPlayingList(false);
      }}
    >
      {seletedPlaylist ? seletedPlaylist : "CM Music"}
    </div>
  );

  // 플레이어 오른쪽 상단의 플레잉 리스트 아이콘
  const playingListIcon = (
    <img
      onClick={() => {
        setShowPlayingList(!showPlayingList);
        setShowPlaylist(false);
      }}
      className="playing-list-icon"
      src={`${musicPlayerIconsRoot}${
        showPlayingList ? "playinglist" : "playinglist2"
      }.png`}
      alt="playinglist"
    />
  );

  // 플레이어 곡 정보
  const playerSongInfoHTMLForMobile = (
    <div
      className="song-info-mobile"
      onClick={() => {
        // 곡 정보 눌렀을 playingList 표시
        setShowPlayingList(!showPlayingList);
        setShowPlaylist(false);
      }}
    >
      <div
        className="song-title"
        style={showPlayingList ? { color: "pink" } : {}}
      >
        {Utils.ellipsisText(songTitle, 20)}
      </div>
      <div
        className="song-artist"
        style={showPlayingList ? { color: "pink" } : {}}
      >
        {Utils.ellipsisText(songArtist, 24)}
      </div>
    </div>
  );

  const playerSongInfoHTMLForPlayer = (
    <div
      className={isPlaying ? "song-info-player" : "song-info-player2"}
      onClick={() => {
        // 곡 정보 눌렀을 playingList 표시
        setShowPlayingList(!showPlayingList);
        setShowPlaylist(false);
      }}
    >
      {Array.from({ length: 7 }, (_, index) => (
        <div
          className="song-info-player-wrap"
          key={index}
          style={
            showPlayingList
              ? { color: "pink", animationPlayState: "paused" }
              : {}
          }
        >
          {songInfo}
        </div>
      ))}
    </div>
  );
  // =============== 플레이어 용 끝 =============== //

  //
  // 플레이리스트에 맞는 노래 가져오기, 로컬 인덱스값 넣어주기
  useEffect(() => {
    if (seletedPlaylist) {
      Utils.setPlayMusics(dispatch, Utils.filterShowMusicData(seletedPlaylist));
      setCurrentVideoIndex(LsUtils.getLastMusicIndex());
    }
  }, [seletedPlaylist, dispatch]);

  // 플레이리스트 바뀌면 랜덤플레이리스트 한 개 만들기
  useEffect(() => {
    setShuffledPlaylist(Utils.shufflePlaylist(playlist));
  }, [playlist]);

  // 진짜 플레이 리스트 목록 업데이트 해주기
  useEffect(() => {
    setRealPlaylist(isShuffleOn ? shuffledPlaylist : playlist);
  }, [playlist, isShuffleOn, shuffledPlaylist]);

  // 키보드로 플레이어 컨트롤 하기 (volume은 volume 컴포넌트에)
  useEffect(() => {
    const handlePlayerWithKeyDown = (e: KeyboardEvent) => {
      if (e.key === ",") {
        playerUtils.changeVideoIndex(-1); // 이전곡
      } else if (e.key === ".") {
        playerUtils.changeVideoIndex(1); // 다음곡
      } else if (e.key === " ") {
        setIsPlaying((pre) => (pre === 0 ? 1 : 0)); // 재생/정지
      } else if (e.key === "/") {
        setIsShuffleOn((pre) => !pre); // 셔플
      } else if (e.key === ";") {
        setShowPlayingList(false);
        setShowPlaylist((pre) => !pre); // 플레이 리스트
      } else if (e.key === "'") {
        setShowPlaylist(false);
        setShowPlayingList((pre) => !pre); // 플레잉 리스트
      } else if (e.key === "o" || e.key === "ㅐ") {
        setRepeat((pre) => !pre); // 한 곡 반복
      }
    };
    window.addEventListener("keydown", handlePlayerWithKeyDown);

    return () => {
      window.removeEventListener("keydown", handlePlayerWithKeyDown);
    };
  }, [playerUtils, isPlaying]);

  // 곡 정보 HTML
  const songInfoHTML = (
    <div
      className="flow-text"
      onClick={() => {
        // 곡 정보 눌렀을 때 유튜브 창 표시
        playerUtils.openVideo(setYouTubeVideSize, setIsVideoOpen, isVideoOpen);
      }}
    >
      {Array.from({ length: 7 }, (_, index) => (
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
      url={realPlaylist[currentVideoIndex]?.url} // 배열 가능하지만 40개정도만 되도 로딩걸리다 안됨
      ref={playerRef}
      playing={!(isPlaying === 0)} // 0: 정지, 1: 재생, 2:로딩
      loop={realPlaylist.length === 1 || repeat} // 한곡이면 반복 or 한곡반복 버튼 활성화
      controls={isPlayer ? false : true} // 유튜브 컨트롤 기능 on/off
      volume={volume / 100} // 0 ~ 1 사이라 /100
      width={isPlayer ? "100%" : youtubeBoxSize.width}
      height={
        isPlayer
          ? showPlaylist || showPlayingList
            ? "0%"
            : "100%"
          : youTubeVideoSize
      }
      // playsinline={true}
      onPlay={() => setIsPlaying(1)} // double check
      onPause={() => setIsPlaying(0)} // double check
      onReady={() => {
        setIsPlayerReady(true); // 버튼 잠금 해제
        setSongInfo(playerUtils.makeSongInfo()); // 노래 정보 만들어 띄우기
        setSongTitle(realPlaylist[currentVideoIndex]?.title); // 제목 업뎃
        setSongArtist(realPlaylist[currentVideoIndex]?.artist); // 가수 업뎃
        LsUtils.setLastMuisicIndex(currentVideoIndex); // 마지막 인덱스값 로컬에 저장
      }}
      onEnded={() => {
        playerUtils.changeVideoIndex(1); // 다음곡 재생
        setIsPlayerReady(false); // 버튼 잠금
      }}
      onBuffer={() => setIsPlaying(3)} // 로딩 중일 때 플레이 버튼 변경
      onProgress={({ played, playedSeconds }) => {
        setPlayed(played);
        setPlayedSeconds(playedSeconds);
      }} // 곡 재생 시간
      onDuration={(e) => setDuration(Utils.formatTime(e))} // 곡 총 시간
      // https://www.npmjs.com/package/react-player#props
    />
  );

  const volumeBar = <Volume isPlayer={isPlayer} />;

  // 플레이어
  if (isPlayer) {
    return (
      <div className="m-background">
        <div className="mobile-music">
          <div className="top">
            <div className="repeat">{repeatIcon}</div>
            <div className="cm-music">{cmMusic}</div>
            <div className="playing-list">{playingListIcon}</div>
          </div>
          <div className="body">
            <div className="m-show-box">
              {
                !seletedPlaylist &&
                  !showPlaylist &&
                  !showPlayingList &&
                  (isMobile ? <MNotice /> : <></>) // 첫 방문 안내
              }
              {showPlaylist && (
                <MPlaylist // 중앙 상단 눌렀을 때 보여주는 플레이 리스트
                  playlistRef={playlistRef}
                  seletedPlaylist={seletedPlaylist}
                  setShowPlaylist={setShowPlaylist}
                />
              )}
              {showPlayingList && (
                <MPlayingList // 오른쪽 상단 or 곡정보 눌렀을 때 보여주는 플레잉 리스트
                  playingListRef={playingListRef}
                  realPlaylist={realPlaylist}
                  setCurrentVideoIndex={setCurrentVideoIndex}
                  setShowPlayingList={setShowPlayingList}
                  currentVideoIndex={currentVideoIndex}
                  isMobile={isMobile}
                />
              )}
              {reactPlayer}
            </div>
            <div className="song-info">
              {isMobile
                ? playerSongInfoHTMLForMobile
                : playerSongInfoHTMLForPlayer}
            </div>
            <div className="controls">
              <div className="play-bar">
                <div className="time-start">
                  {Utils.formatTime(playedSeconds)}
                </div>
                <MPlayerBar
                  played={played}
                  setPlayed={setPlayed}
                  playerRef={playerRef}
                />
                <div className="time-end">{duration}</div>
              </div>
              <div className={isMobile ? "play-btns" : "play-btns-p"}>
                {playerControlBtn}
              </div>
            </div>
          </div>
          {!isMobile && <div className="volumeBar">{volumeBar}</div>}
        </div>
      </div>
    );
  }

  // CMWORLD 사이드
  return (
    <div className="sideMusic">
      <div className="sideMusic-songinfo">{songInfoHTML}</div>
      <div className="sideMusic-mid">
        <div className="sideMusic-control-btn">{playerControlBtn}</div>
      </div>
      <div className="sideMusic-volume">{volumeBar}</div>
      <div className="sideMusic-reactPlayer-wrapper">{reactPlayer}</div>
    </div>
  );
};

export default SideMusic;
