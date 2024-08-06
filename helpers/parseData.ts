import type { IDetail, IFilm, ISpecie, IStarship, IVehicle } from "~/types"

export const parseDetails = (data: IDetail) => {
  return {
    height: data.height,
    mass: data.mass,
    hair_color: data.hair_color,
    skin_color: data.skin_color,
    eye_color: data.eye_color
  }
}

export const parseSpecies = (data: ISpecie) => {
  return {
    name: data.name,
    classification: data.classification,
    designation: data.designation,
    average_height: data.average_height,
    language: data.language
  }
}

export const parseFilms = (data: IFilm[]) => {
  const parsedFilms = data.map(film => {
    return {
      title: film.title,
      episode_id: film.episode_id,
      director: film.director,
      producer: film.producer,
      release_data: film.release_date
    }
  })

  return parsedFilms;
}

export const parseVehicles = (data: IVehicle[]) => {
  const parsedVehicles = data.map(vehicle => {
    return {
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      cost_in_credits: vehicle.cost_in_credits,
      vehicle_class: vehicle.vehicle_class
    }
  })

  return parsedVehicles;
}

export const parseStarships = (data: IStarship[]) => {
  const parsedStarships = data.map(starship => {
    return {
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: starship.cost_in_credits,
      starship_class: starship.starship_class
    }
  })

  return parsedStarships;
}