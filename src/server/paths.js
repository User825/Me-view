const SERVER = 'https://api.themoviedb.org/3/';
const MOVIE_URL = `${SERVER}movie/`;
const TV_URL = `${SERVER}tv/`;
const API_KEY = 'api_key=a7714e9494f5d2f569d289c7e5bfb820';
const SEARCH_URL = `${SERVER}search/multi?query=`;
const IMAGES_URL = `https://image.tmdb.org/t/p/`;
const COUNTRY_URL = `${SERVER}configuration/countries?`;
const GENRES_MOVIE_URL = `${SERVER}genre/movie/list?`;
const GENRES_TV_URL = `${SERVER}genre/tv/list?`;
const DISCOVER_URL = `${SERVER}discover/`;
const PERSON_URL = `${SERVER}person/`;
const langURL = {
  ru: '&language=ru',
  en: '&language=en',
};
const regionURL = {
  ru: '&region=RU',
  us: '&region=US',
};

export {
  MOVIE_URL as movieUrl,
  TV_URL as tvUrl,
  API_KEY as apiKey,
  SEARCH_URL as searchUrl,
  IMAGES_URL as imagesUrl,
  COUNTRY_URL as countryUrl,
  GENRES_MOVIE_URL as genresMovieUrl,
  GENRES_TV_URL as genresTVUrl,
  DISCOVER_URL as discoverUrl,
  PERSON_URL as personUrl,
  langURL,
  regionURL,
};
