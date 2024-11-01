import { IMPlayerBar } from "../../../interface/musicPlayer.Interface";

const MPlayerBar = ({ played, setPlayed, playerRef }: IMPlayerBar) => {
  return (
    <input
      type="range"
      min="0"
      max="0.999999"
      step="any"
      value={played}
      onChange={(e) => {
        const changedRange = e.target.value;
        setPlayed(parseFloat(changedRange));
        if (playerRef.current) {
          playerRef.current.seekTo(parseFloat(changedRange));
        }
      }}
      className="play-bar-range"
    />
  );
};

export default MPlayerBar;
