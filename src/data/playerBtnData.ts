// SideMusic의 플레이어 버튼 Data

import {
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export const buttonData = (
  playerUtils: any,
  setIsPlayerReady: any,
  setIsPlaying: any,
  isPlaying: number,
  setIsShuffleOn: any,
  isShuffleOn: boolean
) => [
  {
    onClick: () => {
      playerUtils.changeVideoIndex(-1);
      setIsPlayerReady(false);
    },
    icon: faBackwardStep,
    className: "",
  },
  {
    onClick: () => setIsPlaying(0),
    icon: faPause,
    className: isPlaying === 0 ? "btn-active" : "",
  },
  {
    onClick: () => setIsPlaying(1),
    icon: isPlaying === 3 ? faSpinner : faPlay,
    className: isPlaying === 1 ? "btn-active" : "",
  },
  // <FontAwesomeIcon icon={faSpinner} spinPulse />
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
