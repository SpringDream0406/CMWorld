import "../../../styles/Setting.css";
import { useState } from "react";
import SettingSwitch from "./SettingSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { settingAction } from "../../../redux/settingReducer";
import { ISwitch } from "../../../interface/setting.interface";
import {
  musicPlayerSwitchInfo,
  switchInfoSpanTitle,
} from "../../../data/settingData";

const MusicPlayerSetting = () => {
  const dispatch = useDispatch();
  const initialMusicSetting = useSelector(
    (state: RootState) => state.setting.musicPlayerSetting // local에 있으면 그거 없으면 false들
  );
  const [musicPlayerSetting, setMusicPlayerSetting] =
    useState<ISwitch>(initialMusicSetting);

  const handleMusicPlayerSetting = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    const updatedSetting = {
      ...musicPlayerSetting,
      [name]: checked,
    };
    setMusicPlayerSetting(updatedSetting);
    dispatch(settingAction.setMusicPlayerSetting(updatedSetting));
  };

  // 본문
  return (
    <div className="musicPlayerSetting">
      <div>
        <SettingSwitch
          switchInfo={musicPlayerSwitchInfo}
          settingData={musicPlayerSetting}
          switchInfoSpanTitle={switchInfoSpanTitle}
          onChange={handleMusicPlayerSetting}
        />
      </div>
    </div>
  );
};

export default MusicPlayerSetting;
