export interface Position {
  latitude: number;
  longitude: number;
  code?: number;
}

export interface PositionError {
  code: number;
  message?: string;
  PERMISSION_DENIED?: number;
  POSITION_UNAVAILABLE?: number;
  TIMEOUT?: number;
}
