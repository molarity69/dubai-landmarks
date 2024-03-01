export interface Landmark {
  objectId?: string;
  photo_thumb?: string;
  order?: number;
  url?: string;
  short_info?: string;
  photo?: string;
  location?: Location;
  title?: string;
  description?: string;
}

export interface Location {
  latitude?: number;
  longitude?: number;
}
