import React from "react";
import { MusicData } from "../interface/music";
import { NavigateFunction } from "react-router-dom";
import { musicActions } from "../redux/reducer";
import { WeatherData } from "../interface/main";

export class Utils {
  static isEmptyObject(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  static getSize(id: string): { width: number; height: number } {
    const element = document.getElementById(id);
    if (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return { width, height };
    } else return { width: 0, height: 0 };
  }

  static ellipsisText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  // 수정 필요
  static getControl(playerRef: React.RefObject<any>): any | undefined {
    if (playerRef && playerRef.current) {
      return playerRef.current.internalPlayer;
    }
  }

  static shufflePlaylist = (playlist: MusicData[]): MusicData[] => {
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

  static moveGeoPage = (navigate: NavigateFunction, inputCode: number) => {
    navigate("geolocation", { state: { code: inputCode } });
  };

  static filterShowData = (
    dispatch: any,
    playlistName: string,
    musicData: MusicData[]
  ): void => {
    dispatch(musicActions.setSelectedPlaylist(playlistName));
    if (playlistName === "음악 전체 보기") {
      dispatch(musicActions.setMusicData(musicData));
      return;
    }
    const filteredMusic = musicData.filter((music) =>
      music.playlists.includes(playlistName)
    );
    dispatch(musicActions.setMusicData(filteredMusic));
  };

  static playSong = (dispatch: any, music: MusicData[]): void => {
    dispatch(musicActions.setPlayMusics(music));
  };

  static changeBackground = (
    setBackgroundImage: any,
    nowWeather: WeatherData
  ): void => {
    if (!Utils.isEmptyObject(nowWeather)) {
      const weather = nowWeather.weather[0].main;
      const imageURL = `/images/backgrounds/${weather}.gif`;
      setBackgroundImage(imageURL);
    }
  };
}
