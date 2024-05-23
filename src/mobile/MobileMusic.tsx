import ReactPlayer from "react-player";
import "./MobileMusic.css";
import { buttonData } from "../data/playerBtnData";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlayerUtils } from "../utils/playerUtils";
import { playlists } from "../data/musicData";
import { Utils } from "../utils/utils";
import { IMusicData } from "../interface/music.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MobileMusic = () => {
  const dispatch = useDispatch();
  const playlist: IMusicData[] = useSelector(
    (state: RootState) => state.music.playMusics // playlist에서 선택한 노래 담겨있음
  );
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false); // 플레이 리스트 보여주기
  const [showPlayingList, setShowPlayingList] = useState<boolean>(false); // 플레링 리스트 보여주기
  const [seletedPlaylist, setSeletedPlaylist] = useState(
    localStorage.getItem("m-playlist")
  ); // 선택된 플레이 리스트
  const [songTitle, setSongTitle] = useState<string>(""); // 제목
  const [songArtist, setSongArtist] = useState<string>(""); // 가수
  const [repeat, setRepeat] = useState<boolean>(false); // 한곡 반복
  const [played, setPlayed] = useState<number>(0); // 곡 재생된 비율
  const [playedSeconds, setPlayedSeconds] = useState<number>(0); // 곡 재생된 초
  const [duration, setDuration] = useState("00:00"); // 곡 총 시간
  const playerRef = useRef<ReactPlayer | null>(null); // 플레이어 컨트롤 Ref
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // 현재 노래 인덱스
  const [isPlaying, setIsPlaying] = useState<number>(0); // 0: 정지, 1: 재생, 2:로딩
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false); // 버튼 잠금용
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(
    localStorage.getItem("isShuffleOn") === "true" || false
  ); // 셔플 기능 on/off
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]); // 셔플된 playlist 담겨있음
  const [realPlaylist, setRealPlaylist] = useState<IMusicData[]>([]); // 일반 or 셔플 된 playlist 담김
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex]
  ); // 유튜브 컨트롤 하는데 필요한 것들 만들어둠

  // 로컬 플레이리스트 있으면 해당 재생 목록으로 변환
  useEffect(() => {
    if (seletedPlaylist)
      Utils.playSong(dispatch, Utils.filterShowMusicData(seletedPlaylist));
  }, [dispatch, seletedPlaylist]);

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸고, localStorage에 저장하고, 랜덤플레이리스트 한 개 만들기
  useEffect(() => {
    setCurrentVideoIndex(0);
    // localStorage.setItem("playlist", JSON.stringify(playlist));
    setShuffledPlaylist(Utils.shufflePlaylist(playlist));
  }, [playlist]);

  // 진짜 플레이 리스트 목록 업데이트 해주기
  useEffect(() => {
    setRealPlaylist(isShuffleOn ? shuffledPlaylist : playlist);
  }, [playlist, isShuffleOn, shuffledPlaylist]);

  // 왼쪽 상단의 한곡 반복 아이콘
  const repeatIcon = (
    <img
      onClick={() => {
        setRepeat(!repeat);
      }}
      className="repeat-icon"
      src={repeat ? "images/repeat-one.png" : "images/repeat2.png"}
      alt="playinglist"
    />
  );

  // 중앙 상단의 CM Music
  const cmMusic = (
    <div
      className="cm-music-txt"
      onClick={() => {
        setShowPlaylist(!showPlaylist);
        setShowPlayingList(false);
      }}
    >
      {seletedPlaylist ? seletedPlaylist : "CM Music"}
    </div>
  );

  // 중앙 상단 클릭 했을 때 나오는 playlist
  const playlistHTML = (
    <div className="m-show-playlist">
      {Object.entries(playlists).map(([key, value]) => (
        <div
          className="m-showing-playlist"
          key={key}
          style={key === seletedPlaylist ? { color: "pink" } : {}}
          onClick={() => {
            setSeletedPlaylist(key);
            setShowPlaylist(!showPlaylist);
            // Utils.playSong(dispatch, Utils.filterShowMusicData(key));
            localStorage.setItem("m-playlist", key);
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );

  // 오른쪽 상단의 플레이리스트 아이콘
  const playingListIcon = (
    <img
      onClick={() => {
        setShowPlayingList(!showPlayingList);
        setShowPlaylist(false);
      }}
      className="playing-list-icon"
      src={
        showPlayingList ? "images/playinglist.png" : "images/playinglist2.png"
      }
      alt="playinglist"
    />
  );

  // 오른쪽 상단 아이콘 클릭 했을 때 나오는 playingList
  const playingListHTML = (
    <div className="m-show-playingList">
      {realPlaylist.map((music, index) => (
        <div
          key={index}
          className="m-showing-playingList"
          onClick={() => {
            setCurrentVideoIndex(index);
            setShowPlayingList(false);
          }}
        >
          <div
            className="m-playingList-title"
            style={index === currentVideoIndex ? { color: "pink" } : {}}
          >
            {Utils.ellipsisText(music.title, 24)}
          </div>
          <div
            className="m-playingList-artist"
            style={index === currentVideoIndex ? { color: "pink" } : {}}
          >
            {Utils.ellipsisText(music.artist, 24)}
          </div>
        </div>
      ))}
    </div>
  );

  // 처음 들어왔을 때 안내 문구
  const noticeHTML = (
    <div className="m-notice">
      <span>안녕하세요. 춘몽입니다.</span>
      <br />
      <span>모바일은 뮤직플레이어만 지원하고 있습니다.</span>
      <br />
      <br />
      <span>
        위에 있는 CM Music을 누르시면 플레이리스트를 보실 수 있으며, 오른쪽 위
        혹은 노래 제목과 가수 부분을 누르시면 플레이 중인 플레이리스트의 곡
        목록을 보실 수 있습니다.
      </span>
    </div>
  );

  // 플레이어 컨트롤 버튼
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
        (index === 0 && realPlaylist.length === 1) ||
        (index === 3 && realPlaylist.length === 1) ||
        (index === 4 && realPlaylist.length === 1) ||
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
      url={realPlaylist[currentVideoIndex]?.url}
      ref={playerRef}
      playing={!(isPlaying === 0)}
      loop={repeat} // 한곡 반복
      controls={false} // 유튜브 컨트롤 기능 on/off
      width={"100%"}
      height={"100%"}
      onPlay={() => setIsPlaying(1)}
      onPause={() => setIsPlaying(0)}
      onReady={() => {
        setIsPlayerReady(true); // 버튼 잠금 해제
        setSongTitle(realPlaylist[currentVideoIndex]?.title); // 제목 업뎃
        setSongArtist(realPlaylist[currentVideoIndex]?.artist); // 가수 업뎃
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
    />
  );

  // 곡 정보 HTML
  const songInfoHTML = (
    <div
      className="song-info2"
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
        {Utils.ellipsisText(songTitle, 16)}
      </div>
      <div
        className="song-artist"
        style={showPlayingList ? { color: "pink" } : {}}
      >
        {Utils.ellipsisText(songArtist, 24)}
      </div>
    </div>
  );

  // player bar
  const playerBar = (
    <input
      type="range"
      min="0"
      max="0.999999"
      step="any"
      value={played}
      onChange={(e) => {
        const changedRange = e.target.value;
        setPlayed(parseFloat(changedRange));
        if (playerRef.current)
          playerRef.current.seekTo(parseFloat(changedRange));
      }}
      className="play-bar-range"
    />
  );

  // 본문
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
            {!seletedPlaylist &&
              !showPlaylist &&
              !showPlayingList &&
              noticeHTML}
            {showPlaylist && playlistHTML}
            {showPlayingList && playingListHTML}
            <div
              className="m-player"
              style={
                showPlaylist || showPlayingList
                  ? { height: "0%" }
                  : { height: "100%" }
              }
            >
              {reactPlayer}
            </div>
          </div>
          <div className="song-info">{songInfoHTML}</div>
          <div className="controls">
            <div className="play-bar">
              <div className="time-start">
                {Utils.formatTime(playedSeconds)}
              </div>
              {playerBar}
              <div className="time-end">{duration}</div>
            </div>
            <div className="btns">{playerControlBtn}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMusic;
