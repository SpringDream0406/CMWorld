import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ISwitch,
  ISwitchInfo,
  ISwitchInfoSpanTitle,
} from "../../interface/setting";

const SettingSwitch = ({
  switchInfo,
  settingData,
  switchInfoSpanTitle,
  onChange,
}: {
  switchInfo: ISwitchInfo;
  settingData: ISwitch;
  switchInfoSpanTitle: ISwitchInfoSpanTitle;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">{switchInfo.title}</FormLabel>
        <FormGroup>
          {Object.entries(settingData).map(([key, value]) => (
            <div key={key}>
              <FormControlLabel
                control={
                  <Switch checked={value} onChange={onChange} name={key} />
                }
                label={key}
              />
              <span
                className="Information-icon"
                title={switchInfoSpanTitle[key]}
              >
                <FontAwesomeIcon icon={faCircleQuestion} />
              </span>
            </div>
          ))}
        </FormGroup>
        <FormHelperText>{switchInfo.info}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SettingSwitch;
