const MOVIE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "api_key=a7714e9494f5d2f569d289c7e5bfb820";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";
const IMAGES_URL = "https://image.tmdb.org/t/p/";
const COUNTRY_URL = "https://api.themoviedb.org/3/configuration/countries?";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?";
const RU_LANGUAGE = "&language=ru";
const EN_LANGUAGE = "&language=en";
const RU_REGION = "&region=RU";

const getImgSrc = (src) => {
  const noSrcPattern = /null/;

  return noSrcPattern.test(src) ? null : src;
}

const getMovie = async movieId => {
  const response = await fetch(
    `${MOVIE_URL}${movieId}?${API_KEY}${RU_LANGUAGE}`
  );
  if (response.ok) {
    const data = await response.json();
    const genres = data.genres.map(genre => genre.name).join(", ");
    const productionCountries = data.production_countries.map(country => country.iso_3166_1);
    const responseSrc = getImagesUrl(500, data.poster_path);

    return {
        title: data.title,
        posterSrc: getImgSrc(responseSrc),
        desc: data.overview,
        homepage: data.homepage,
        rating: data.vote_average,
        releaseDate: new Date(data.release_date),
        productionCountries,
        budget: data.budget,
        genres
    };
  } else {
    const error = new Error(
      `Could not fetch movieId: ${movieId}; received ${response.status}`
    );
    console.error(error);
  }
};

const getSimilarMovies = async (movieId, language) => {
  const response = await fetch(
    `${MOVIE_URL}${movieId}/similar?${API_KEY}${
      language === "RU" ? RU_LANGUAGE : EN_LANGUAGE
    }`
  );
  if (response.ok) {
    const data = await response.json();
    const movies = await data.results.map(movie => {
      const noSrcPattern = /null/;
      const responseSrc = getImagesUrl(500, movie.poster_path);
      const imgSrc = noSrcPattern.test(responseSrc) ? null : responseSrc;
      const releaseDate = movie.release_date
        ? new Date(movie.release_date)
        : null;
      return {
        id: movie.id,
          title: movie.title,
          imgSrc: imgSrc,
          desc: movie.overview,
          rating: movie.vote_average,
          year: releaseDate ? String(releaseDate.getFullYear()) : "",
      }
    })
    
    return await {
      movies,
      totalPages: data.total_pages
    };
  } else {
    const error = new Error(
      `Could not fetch movieId: ${movieId}; received ${response.status}`
    );
    console.error(error);
  }
}

const getBackdrop = async (movieId, language) => {
  const response = await fetch(
    `${MOVIE_URL}${movieId}/images?${API_KEY}${
      language === "RU" ? RU_LANGUAGE : EN_LANGUAGE
    }`
  );
  if (response.ok) {
    const data = await response.json();
    const backdrop = data.backdrops.length > 0 ? getImagesUrl('original', data.backdrops[0].file_path) : null;
    
    return backdrop;
  } else {
    const error = new Error(
      `Could not fetch movieId: ${movieId}; received ${response.status}`
    );
    console.error(error);
  }
}

const getTrailer = async (movieId, language) => {
  const response = await fetch(
    `${MOVIE_URL}${movieId}/videos?${API_KEY}${
      language === "RU" ? RU_LANGUAGE : EN_LANGUAGE
    }`
  );
  if (response.ok) {
    let data = await response.json();

    return await data;
  } else {
    const error = new Error(
      `Could not fetch movieId: ${movieId}; received ${response.status}`
    );
    console.error(error);
  }
};

const getPopularMovies = async (pageNumber = 1) => {
  const response = await fetch(
    `${MOVIE_URL}popular?${API_KEY}${RU_LANGUAGE}${RU_REGION}&page=${pageNumber}`
  );
  if (response.ok) {
    let data = await response.json();
    const movies = await data.results.map(movie => {
      const releaseDate = movie.release_date
        ? new Date(movie.release_date)
        : null;
      return {
        id: movie.id,
          title: movie.title,
          imgSrc: getImagesUrl(500, movie.poster_path),
          desc: movie.overview,
          rating: movie.vote_average,
          year: releaseDate ? String(releaseDate.getFullYear()) : "",
      }
    })
    return await {
      movies,
      totalPages: data.total_pages
    };
  } else {
    const error = new Error(
      `Could not fetch popular movies; received ${response.status}`
    );
    console.error(error);
  }
};

const getPlayedMoviesNow = async (pageNumber = 1) => {
  const response = await fetch(
    `${MOVIE_URL}now_playing?${API_KEY}${RU_LANGUAGE}${RU_REGION}&page=${pageNumber}`
  );
  if (response.ok) {
    let data = await response.json();
    const moviesWithBackdrop = data.results.filter(movie => movie.backdrop_path);
    const moviesForRender = await moviesWithBackdrop.map(movie => {
      const releaseDate = movie.release_date
        ? new Date(movie.release_date)
        : null;
      return {
        id: movie.id,
        title: movie.title,
        urlSrcMobile: getImagesUrl(500, movie.backdrop_path),
        urlSrcDesktop: getImagesUrl('original', movie.backdrop_path),
        rating: movie.vote_average,
        desc: movie.overview,
        date: releaseDate.toLocaleString('ru', {month: 'long', day: 'numeric'}),
      }
    })
    return await {
      movies: moviesForRender,
      totalPages: data.total_pages
    };
  } else {
    const error = new Error(
      `Could not fetch popular movies; received ${response.status}`
    );
    console.error(error);
  }
};

const searchMovies = async (searchValue, page) => {
  const genresList = await getAllGenres().then(genres => {
    return genres.reduce((acc, item) => ({ ...acc, [item.id]: item.name }),{});
  });
  const response = await fetch(
    `${SEARCH_URL}${searchValue}&${API_KEY}${RU_LANGUAGE}&page=${page}`
  );
  if (response.ok) {
    let data = await response.json();
    const responseMovies = data.results.map(movie => {
      const noSrcPattern = /null/;
      const responseSrc = getImagesUrl(500, movie.poster_path);
      const imgSrc = noSrcPattern.test(responseSrc) ? null : responseSrc;
      const releaseDate = movie.release_date
        ? new Date(movie.release_date)
        : null;
      const genres = movie.genre_ids.map(genre => genresList[genre]).join(", ");
      return {
        imgSrc,
        title: movie.title,
        desc: movie.overview,
        rating: movie.vote_average,
        id: movie.id,
        year: releaseDate ? String(releaseDate.getFullYear()) : "",
        genres: genres
      };
    });

    return {
      movies: responseMovies,
      totalResults: data.total_results,
      maxPages: data.total_pages
    };
  } else {
    const error = new Error(
      `Could not fetch ${searchValue}; received ${response.status}`
    );
    console.error(error);
  }
};

const getImagesUrl = (width, url) => {
  return `${IMAGES_URL}${
    width === "original" ? "original" : "w" + width
  }${url}`;
};

const getAllCountries = async () => {
  const response = await fetch(`${COUNTRY_URL}${API_KEY}`);
  if (response.ok) {
    let data = await response.json();

    return await data;
  } else {
    const error = new Error(
      `Could not fetch countries data; received ${response.status}`
    );
    console.error(error);
  }
};

const getAllGenres = async () => {
  const response = await fetch(`${GENRES_URL}${API_KEY}${RU_LANGUAGE}`);
  if (response.ok) {
    let data = await response.json();

    return await data.genres;
  } else {
    const error = new Error(
      `Could not fetch genres data; received ${response.status}`
    );
    console.error(error);
  }
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
  getBackdrop,
  getSimilarMovies
};

export default tmdbSevice;
