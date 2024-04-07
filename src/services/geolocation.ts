import { IPosition, IPositionError } from "../interface/service";

export const getLocation = async (): Promise<IPosition | IPositionError> => {
  return new Promise<IPosition | IPositionError>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(getLatLot(position)),
      (error: IPositionError) => reject(error)
    );
  });
};

const getLatLot = (
  position: GeolocationPosition
): IPosition | IPositionError => {
  const positionObj: IPosition = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  const isCheckdLocation: boolean = checkLocation(positionObj);
  if (isCheckdLocation === false) {
    return { code: 10 };
  }
  return positionObj;
};

const checkLocation = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): boolean => {
  if (
    // 극동: 경상북도 울릉군의 독도 동단 동경 131° 52′20" → 131.87222222
    // 극서: 평안북도 용천군 신도면 마안도 서단 동경 124° 11′45" → 124.19583333
    // 극남: 제주도 남제주군 대정읍 마라도 남단 북위 33° 06′40" → 33.11111111
    // 극북: 함경북도 온성군 남양면 북단 북위 43° 00′35" → 43.00972222
    !(latitude >= 33.11111111 && latitude <= 43.00972222) ||
    !(longitude >= 124.19583333 && longitude <= 131.87222222)
  ) {
    return false;
  } else {
    return true;
  }
};
