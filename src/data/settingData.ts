import { Utils } from "../utils/utils";

const musicPlayerDefaultSetting = {
  "플레이리스트 저장": false,
  "음악 자동 추천": false,
};

const localStorageMusicPlayerSetting =
  Utils.getObjLocalData("musicPlayerSetting");

export const initialMusicSetting =
  localStorageMusicPlayerSetting || musicPlayerDefaultSetting;

export const musicPlayerSwitchInfo = {
  title: "뮤직 플레이어",
  info: "localStorage에 저장됩니다. (음량과 랜덤재생 설정은 자동으로 localStorage에 저장됩니다.)",
};

export const switchInfoSpanTitle = {
  "플레이리스트 저장":
    "마지막으로 재생한 플레이리스트가 저장됩니다. (한 곡일 경우 한 곡만 저장됩니다.)",
  "음악 자동 추천":
    "플레이리스트를 자동으로 설정합니다. (시간과 날씨에 따라 다른 플레이리스트로 자동 설정됩니다.)",
};
