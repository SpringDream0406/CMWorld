export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(getLatLot(position)),
      (error) => reject(error)
    );
  });
};

const getLatLot = (position) => {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  const isCheckdLocation = checkLocation(positionObj);
  if (isCheckdLocation === false) {
    // console.error("사용자 위치가 한국이 아닙니다.");
    return { code: 10 };
  }
  return positionObj;
};

const checkLocation = ({ latitude, longitude }) => {
  if (
    // 극동: 경상북도 울릉군의 독도 동단 동경 131° 52′20" → 131.87222222
    // 극서: 평안북도 용천군 신도면 마안도 서단 동경 124° 11′45" → 124.19583333
    // 극남: 제주도 남제주군 대정읍 마라도 남단 북위 33° 06′40" → 33.11111111
    // 극북: 함경북도 온성군 남양면 북단 북위 43° 00′35" → 43.00972222
    !(latitude >= 33.11111111 && latitude <= 43.00972222) ||
    !(longitude >= 124.19583333 && longitude <= 131.87222222)
  ) {
    return false;
  }
};
