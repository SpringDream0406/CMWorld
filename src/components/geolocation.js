const accessTogeo = (position) => {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  return positionObj;
};

let insertMessage = "";

const controlErr = (err) => {
  switch (err.code) {
    case 1:
      console.error("사용자가 위치 정보 접근을 거부했습니다.");
      break;
    case 2:
      console.error("사용자의 위치 정보를 확인할 수 없습니다.");
      break;
    case 3:
      console.error("위치 정보 확인이 시간 초과되었습니다.");
      break;
    default:
      console.error("알 수 없는 오류가 발생했습니다.");
  }
};

export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(accessTogeo(position)),
      (error) => reject(controlErr(error))
    );
  });
};
