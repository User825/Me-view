const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
const TV_URL = 'https://api.themoviedb.org/3/tv/';
const API_KEY = 'api_key=a7714e9494f5d2f569d289c7e5bfb820';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=';
const IMAGES_URL = 'https://image.tmdb.org/t/p/';
const COUNTRY_URL = 'https://api.themoviedb.org/3/configuration/countries?';
const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?';
const langURL = {
  ru: '&language=ru',
  en: '&language=en',
};
const regionURL = {
  ru: '&region=RU',
  us: '&region=US',
};

const fetchDB = async (url, errorMessage) => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    const error = new Error(`${errorMessage}; received ${response.status}`);
    console.error(error);
  }
};

const getImgSrc = (src) => {
  const noSrcPattern = /null/;

  return noSrcPattern.test(src) ? null : src;
};

const getYoutubePosterSrc = (videoId) => {
  return `http://img.youtube.com/vi/${videoId}/0.jpg`;
};

const getImagesUrl = (width, url) => {
  return `${IMAGES_URL}${
    width === 'original' ? 'original' : 'w' + width
  }${url}`;
};

const getYear = (date) => {
  return date ? String(date.getFullYear()) : '';
};

const getDetails = (data, posterWidth = 500) => {
  const releaseDate = data.release_date ? new Date(data.release_date) : null;
  const year = getYear(releaseDate);
  const responseSrc = getImagesUrl(posterWidth, data.poster_path);
  return {
    id: data.id,
    title: data.title,
    posterSrc: getImgSrc(responseSrc),
    desc: data.overview,
    rating: data.vote_average,
    releaseDate,
    year,
  };
};

const getShowDetails = (show) => {
  const details = getDetails(show);

  details.title = show.name;
  const inProduction = show.in_production;
  const firstAirDate = show.first_air_date
    ? new Date(show.first_air_date)
    : null;
  const lastAirDate = show.last_air_date ? new Date(show.last_air_date) : null;
  details.year = inProduction
    ? `${getYear(firstAirDate)}–`
    : getYear(firstAirDate) === getYear(lastAirDate)
    ? getYear(firstAirDate)
    : `${getYear(firstAirDate)}–${getYear(lastAirDate)}`;

  return details;
};

const getAllCountries = async () => {
  const url = `${COUNTRY_URL}${API_KEY}`;
  const errorMessage = 'Could not fetch countries data';

  return await fetchDB(url, errorMessage);
};

const getAllGenres = async (lang = 'ru') => {
  const url = `${GENRES_URL}${API_KEY}${langURL[lang]}`;
  const errorMessage = 'Could not fetch genres data';

  return await fetchDB(url, errorMessage);
};

const getMovie = async (movieId, lang = 'ru') => {
  const url = `${MOVIE_URL}${movieId}?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch movieId: ${movieId}`;
  const movie = fetchDB(url, errorMessage).then((responseMovie) => {
    const details = getDetails(responseMovie);
    const genres = responseMovie.genres.map((genre) => genre.name).join(', ');
    const productionCountries = responseMovie.production_countries.map(
      (country) => country.iso_3166_1
    );

    return {
      productionCountries,
      budget: responseMovie.budget,
      genres,
      homepage: responseMovie.homepage,
      ...details,
    };
  });

  return movie;
};

const getShow = async (id, lang = 'ru') => {
  const url = `${TV_URL}${id}?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch TV show from ID: ${id}`;
  const show = fetchDB(url, errorMessage);

  return show;
};

const getShowAllData = async (id) => {
  const show = await getShow(id).then((responseShow) => {
    const details = getDetails(responseShow);
    const genres = responseShow.genres.map((genre) => genre.name).join(', ');
    const inProduction = responseShow.in_production;
    const homepage = responseShow.homepage;
    const seasonsQuantity = responseShow.seasons.length;
    const firstAirDate = responseShow.first_air_date
      ? new Date(responseShow.first_air_date)
      : null;
    const lastAirDate = responseShow.last_air_date
      ? new Date(responseShow.last_air_date)
      : null;
    details.year = inProduction
      ? `${getYear(firstAirDate)}–`
      : getYear(firstAirDate) === getYear(lastAirDate)
      ? getYear(firstAirDate)
      : `${getYear(firstAirDate)}–${getYear(lastAirDate)}`;
    details.title = responseShow.name;

    return {
      genres,
      homepage,
      seasonsQuantity,
      ...details,
    };
  });

  return show;
};

const getSimilarMovies = async (movieId, lang = 'ru') => {
  const url = `${MOVIE_URL}${movieId}/similar?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch similar movies from movie ID: ${movieId}`;
  const similarMovies = fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const similar = response.results.map((movie) => getDetails(movie));

    return {
      totalPages,
      similar,
    };
  });

  return similarMovies;
};

const getSimilarShow = async (movieId, lang = 'ru') => {
  const url = `${TV_URL}${movieId}/similar?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch similar shows from movie ID: ${movieId}`;
  const similarShows = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const similar = response.results.map((show) => getShowDetails(show));

    return {
      totalPages,
      similar,
    };
  });

  return similarShows;
};

const getBackdropMovie = async (movieId) => {
  const url = `${MOVIE_URL}${movieId}/images?${API_KEY}`;
  const errorMessage = `Could not fetch images from movie ID: ${movieId}`;
  const backdrop = fetchDB(url, errorMessage).then((response) => {
    return response.backdrops.length > 0
      ? getImagesUrl('original', response.backdrops[0].file_path)
      : null;
  });

  return backdrop;
};

const getBackdropShow = async (movieId) => {
  const url = `${TV_URL}${movieId}/images?${API_KEY}`;
  const errorMessage = `Could not fetch images from movie ID: ${movieId}`;
  const backdrop = fetchDB(url, errorMessage).then((response) => {
    return response.backdrops.length > 0
      ? getImagesUrl('original', response.backdrops[0].file_path)
      : null;
  });

  return backdrop;
};

const getTrailer = async (movieId, lang = 'ru') => {
  const url = `${MOVIE_URL}${movieId}/videos?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch trailers from movie ID: ${movieId}`;
  const trailers = fetchDB(url, errorMessage).then((response) => {
    return response.results.map((trailer) => {
      const site = trailer.site;
      const id = trailer.key;

      return {
        id,
        site,
        poster: site === 'YouTube' ? getYoutubePosterSrc(id) : null,
      };
    });
  });

  return trailers;
};

const getShowTrailers = async (showId, lang = 'ru') => {
  const url = `${TV_URL}${showId}/videos?${API_KEY}${langURL[lang]}`;
  const errorMessage = `Could not fetch trailers from movie ID: ${showId}`;
  const trailers = fetchDB(url, errorMessage).then((response) => {
    return response.results.map((trailer) => {
      const site = trailer.site;
      const id = trailer.key;

      return {
        id,
        site,
        poster: site === 'YouTube' ? getYoutubePosterSrc(id) : null,
      };
    });
  });

  return trailers;
};

const getPopularMovies = async (pageNumber = 1, lang = 'ru', region = 'ru') => {
  const url = `${MOVIE_URL}popular?${API_KEY}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
  const errorMessage = 'Could not fetch popular movies';
  const popularMovies = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const movies = response.results.map((movie) => getDetails(movie));

    return {
      totalPages,
      movies,
    };
  });

  return popularMovies;
};

const getPopularShows = async (pageNumber = 1, lang = 'ru', region = 'ru') => {
  const url = `${TV_URL}popular?${API_KEY}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
  const errorMessage = 'Could not fetch popular TV-show';
  const generals = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const IDs = response.results.map((serial) => serial.id);

    return {
      totalPages,
      IDs,
    };
  });

  const shows = await Promise.all(
    generals.IDs.map(async (id) => {
      const show = await getShow(id);
      const details = getShowDetails(show);

      return details;
    })
  );

  return {
    shows,
    totalPages: generals.totalPages,
  };
};

const getPlayedMoviesNow = async (
  pageNumber = 1,
  lang = 'ru',
  region = 'ru'
) => {
  const url = `${MOVIE_URL}now_playing?${API_KEY}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
  const errorMessage = 'Could not fetch now played movies';
  const nowPlayedMovies = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const movies = response.results.map((movie) => {
      const details = getDetails(movie);
      const date = details.releaseDate.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
      });
      const backdrop =  getImagesUrl('original', movie.backdrop_path)
      return {
        urlSrcMobile: getImagesUrl(500, movie.backdrop_path),
        urlSrcDesktop: getImgSrc(backdrop),
        date,
        ...details,
      };
    }).filter(movie => movie.urlSrcDesktop);

    return {
      totalPages,
      movies,
    };
  });

  return nowPlayedMovies;
};

const searchMovies = async (searchValue, page, lang = 'ru') => {
  const url = `${SEARCH_URL}${searchValue}&${API_KEY}${langURL[lang]}&page=${page}`;
  const errorMessage = `Could not fetch ${searchValue}`;
  const searchedMovies = await fetchDB(url, errorMessage).then((response) => {
    const totalResults = response.total_results;
    const maxPages = response.total_pages;
    const movies = response.results.map((movie) => getDetails(movie));

    return {
      totalResults,
      maxPages,
      movies,
    };
  });

  return searchedMovies;
};

const tmdbSevice = {
  searchMovies,
  getMovie,
  getImagesUrl,
  getTrailer,
  getPopularMovies,
  getPlayedMoviesNow,
  getAllCountries,
  getAllGenres,
  getBackdropMovie,
  getBackdropShow,
  getSimilarMovies,
  getSimilarShow,
  getPopularShows,
  getShowAllData,
  getShowTrailers,
};

export default tmdbSevice;
