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

export declare interface formFilter {
  type: string;
  sortBy: string;
  genre: string;
  year: string;
  country: string;
  pageFilter: number;
}

export declare interface plan {
  id: string;
  name: string;
  price: number;
  video_quality: string;
  resolution: string;
  support_devices: string;
}
