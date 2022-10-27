export interface IPhotos {
  camera: ICamera;
  earth_date: string;
  id: number
  img_src: string;
  rover: IRover
  sol: number;
}
export interface ICamera {
  full_name: string;
  id: number;
  name: string;
  rover_id: number
}
export interface IRover {
 landing_date: string;
  launch_date: string;
  status: string
  id: number;
  name: string;
}
