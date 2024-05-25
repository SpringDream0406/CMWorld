export class LsUtils {
  static getObjLocalData(id: string): any | undefined {
    const localData = localStorage.getItem(id);
    if (localData) return JSON.parse(localData);
  }

  //   static setObjLocalData(id: string, data: any): void {
  //     localStorage.setItem(id, JSON.stringify(data));
  //   }

  static getMusicPlayerVolume(): number {
    return Number(localStorage.getItem("musicPlayerVolume") || "10");
  }

  static resetLastMusicIndex(): void {
    localStorage.setItem("lastMusicIndex", "0");
  }
  static setLastMuisicIndex(currentVideoIndex: number): void {
    localStorage.setItem("lastMusicIndex", String(currentVideoIndex));
  }
  static getLastMusicIndex(): number {
    return Number(localStorage.getItem("lastMusicIndex") || "0");
  }

  static setPlaylistCategory(playlistCategory: string): void {
    localStorage.setItem("playlistCategory", playlistCategory);
  }
  static getPlaylistCategory(): string {
    return localStorage.getItem("playlistCategory") || "";
  }

  static getIsShuffleOn(): boolean {
    return localStorage.getItem("isShuffleOn") === "true" || false;
  }
}
