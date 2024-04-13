import * as React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useDispatch } from "react-redux";
import { musicActions } from "../../redux/reducer";

const Input = styled(MuiInput)`
  width: 42px;
`;

// 새로운 테마 생성
const theme = createTheme({
  components: {
    // MuiSlider: {
    //   styleOverrides: {
    //     root: {
    //       color: "pink", // 슬라이더의 색상 변경
    //     },
    //   },
    // },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "black", // 입력 필드의 텍스트 색상 변경
        },
        underline: {
          "&:before": {
            borderBottom: "none", // 입력 필드의 밑줄 색상 변경
          },
        },
      },
    },
  },
});

export default function InputSlider() {
  const [value, setValue] = React.useState(
    parseInt(localStorage.getItem("musicPlayerVolume") || "10")
  );
  const [previousVolume, setPreviousVolume] = React.useState(0); // 이전 볼륨 상태를 저장
  const [muted, setMuted] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(musicActions.setVolume(value));
    localStorage.setItem("musicPlayerVolume", String(value));
  }, [value, dispatch]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setMuted(newValue === 0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
    setMuted(event.target.value === "0");
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
    if (!muted) {
      setPreviousVolume(value); // 음소거 해제할 때 이전 볼륨 값을 저장
      setValue(0); // 음소거 상태에서는 볼륨을 0으로 설정
    } else {
      setValue(previousVolume); // 이전 볼륨 값을 복원
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
    setMuted(value === 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
        <Typography id="input-slider" gutterBottom></Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {muted ? (
              <VolumeOffIcon
                onClick={handleMuteToggle}
                sx={{ color: "grey" }} // 뮤트일 때 아이콘의 색상 변경
              />
            ) : (
              <VolumeUpIcon onClick={handleMuteToggle} />
            )}
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              sx={{
                color: muted ? "grey" : "purple", // 뮤트일 때 슬라이더의 색상 변경
              }}
            />
          </Grid>
          <Grid item>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
