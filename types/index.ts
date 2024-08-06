export interface IDetail {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface ISpecie {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  language: string;
}

export interface IFilm {
  title?: string;
  episode_id: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface IVehicle {
  name?: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  vehicle_class: string;
}

export interface IStarship {
  name?: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  starship_class: string;
}

export interface IAPIResponse {
  count: number;
  results: IDetail[];
}
