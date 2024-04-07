import "../../styles/Setting.css";
import { useState } from "react";
import SettingSwitch from "./SettingSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { settingAction } from "../../redux/settingReducer";
import { ISwitch } from "../../interface/setting";
import {
  musicPlayerSwitchInfo,
  switchInfoSpanTitle,
} from "../../data/settingData";

const MusicPlayerSetting = () => {
  const dispatch = useDispatch();
  const initialMusicSetting = useSelector(
    (state: RootState) => state.setting.musicPlayerSetting
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

  return (
    <div className="musicPlayerSetting">
      <div>
        <SettingSwitch
          switchInfo={musicPlayerSwitchInfo}
          settingData={musicPlayerSetting}
          switchInfoSpanTitle={switchInfoSpanTitle}
          onChange={handleMusicPlayerSetting}
        />
        {/* 프리스타일 Y 플레이 목록으로 넘겨주기 */}
        {/* 자동 재생 <button>play</button>{" "}
        <span title="asdfa">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </span> */}
      </div>
    </div>
  );
};

export default MusicPlayerSetting;
