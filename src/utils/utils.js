export class Utils {
  static isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  static getSize(id) {
    const element = document.getElementById(id);
    if (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return { width, height };
    }
  }
  static ellipsisText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  static formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  static getControl(playerRef) {
    if (playerRef && playerRef.current) {
      console.log("aa");
      return playerRef.current.internalPlayer;
    }
  }

  static shufflePlaylist = (playlist) => {
    const shuffledPlaylist = [...playlist];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [
        shuffledPlaylist[j],
        shuffledPlaylist[i],
      ];
    }
    return shuffledPlaylist;
  };
}
