export interface IPosition {
  latitude: number;
  longitude: number;
  code?: number;
}

export interface IPositionError {
  code: number;
  message?: string;
  PERMISSION_DENIED?: number;
  POSITION_UNAVAILABLE?: number;
  TIMEOUT?: number;
}
