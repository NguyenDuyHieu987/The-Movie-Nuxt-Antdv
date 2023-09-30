export declare interface genre {
  id: number;
  name_vietsub: string;
  name: string;
  short_name: string;
}

export declare interface country {
  iso_639_1: string;
  english_name: string;
  name: string;
  short_name: string;
}

export declare interface year {
  name: string;
}

export declare interface sortby {
  id: string;
  name: string;
}

export declare type typeMovie =
  | 'all'
  | 'nowplaying'
  | 'popular'
  | 'toprated'
  | 'upcoming';

export declare type typeTv =
  | 'all'
  | 'airingtoday'
  | 'ontheair'
  | 'popular'
  | 'toprated';

export declare interface formfilter {
  type: string;
  sortBy?: string;
  genre: string | string;
  year: string;
  country: string;
  page?: number;
  limit?: number;
}

export declare interface plan {
  id: string;
  order: number;
  name: string;
  price: number;
  video_quality: string;
  resolution: string;
  support_devices: string;
}

export declare type user = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string | number;
  auth_type: string;
  created_at?: string;
  updated_at?: string;
} | null;
