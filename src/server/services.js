import {
  movieUrl,
  tvUrl,
  apiKey,
  searchUrl,
  imagesUrl,
  countryUrl,
  genresMovieUrl,
  genresTVUrl,
  discoverUrl,
  personUrl,
  langURL,
  regionURL,
} from './paths';
import { getRandomNumber, preloadImages, removeDuplicates } from 'utils/';

const fetchDB = async (url, errorMessage, controller) => {
  const options = controller ? { signal: controller.signal } : {};
  const response = await fetch(url, options);
  if (response.ok) {
    return await response.json();
  } else {
    const error = new Error(`${errorMessage}; received ${response.status}`);
    console.error(error);
  }
};

const getImgSrc = (src, noPreload = false) => {
  const noSrcPattern = /null/;

  if (noPreload) {
    return noSrcPattern.test(src) ? null : src;
  }

  return noSrcPattern.test(src) ? null : preloadImages(src);
};

const getYoutubePosterSrc = (videoId) => {
  return preloadImages(`http://img.youtube.com/vi/${videoId}/0.jpg`);
};

const getBackdropSrc = (path) => {
  const url = getImagesUrl('original', path);

  return getImgSrc(url);
};

const getImagesUrl = (width, url) => {
  return `${imagesUrl}${width === 'original' ? 'original' : 'w' + width}${url}`;
};

const getImage = (path, width = '500', noPreload) => {
  const url = getImagesUrl(width, path);

  return getImgSrc(url, noPreload);
};

const getYear = (date) => {
  return date ? String(date.getFullYear()) : '';
};

const getDetails = (data, noPreload = false, posterWidth = 500) => {
  const releaseDate = data.release_date ? new Date(data.release_date) : null;
  const year = getYear(releaseDate);

  return {
    id: data.id,
    title: data.title,
    posterSrc: getImage(data.poster_path, posterWidth, noPreload),
    desc: data.overview,
    rating: data.vote_average !== 0 ? data.vote_average : null,
    releaseDate,
    year,
  };
};

const getShowDetails = (show, noPreload) => {
  const details = getDetails(show, noPreload);

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
  const url = `${countryUrl}${apiKey}`;
  const errorMessage = 'Could not fetch countries data';

  return await fetchDB(url, errorMessage);
};

const getAllGenres = async (lang = 'ru') => {
  const urlMovie = `${genresMovieUrl}${apiKey}${langURL[lang]}`;
  const urlTV = `${genresTVUrl}${apiKey}${langURL[lang]}`;
  const errorMessage = 'Could not fetch genres data';

  return {
    movie: await fetchDB(urlMovie, errorMessage).then(
      (response) => response.genres
    ),
    tv: await fetchDB(urlTV, errorMessage).then((response) => response.genres),
  };
};

const getMovie = async (movieId, lang = 'ru') => {
  const url = `${movieUrl}${movieId}?${apiKey}${langURL[lang]}`;
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
  const url = `${tvUrl}${id}?${apiKey}${langURL[lang]}`;
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

const getSimilarMovies = async (movieId, page = 1, lang = 'ru') => {
  const url = `${movieUrl}${movieId}/similar?${apiKey}${langURL[lang]}&page=${page}`;
  const errorMessage = `Could not fetch similar movies from movie ID: ${movieId}`;
  const similarMovies = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const similar = response.results.map((movie) => getDetails(movie));

    return {
      totalPages,
      similar,
    };
  });

  return similarMovies;
};

const getSimilarShow = async (movieId, page = 1, lang = 'ru') => {
  const url = `${tvUrl}${movieId}/similar?${apiKey}${langURL[lang]}&page=${page}`;
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
  const url = `${movieUrl}${movieId}/images?${apiKey}`;
  const errorMessage = `Could not fetch images from movie ID: ${movieId}`;
  const backdrop = fetchDB(url, errorMessage).then((response) => {
    return response.backdrops.length > 0
      ? getBackdropSrc(response.backdrops[0].file_path)
      : null;
  });

  return backdrop;
};

const getBackdropShow = async (movieId) => {
  const url = `${tvUrl}${movieId}/images?${apiKey}`;
  const errorMessage = `Could not fetch images from movie ID: ${movieId}`;
  const backdrop = fetchDB(url, errorMessage).then((response) => {
    return response.backdrops.length > 0
      ? getBackdropSrc(response.backdrops[0].file_path)
      : null;
  });

  return backdrop;
};

const getTrailer = async (movieId, lang = 'ru') => {
  const url = `${movieUrl}${movieId}/videos?${apiKey}${langURL[lang]}`;
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
  const url = `${tvUrl}${showId}/videos?${apiKey}${langURL[lang]}`;
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
  const url = `${movieUrl}popular?${apiKey}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
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
  const url = `${tvUrl}popular?${apiKey}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
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
  const url = `${movieUrl}now_playing?${apiKey}${langURL[lang]}${regionURL[region]}&page=${pageNumber}`;
  const errorMessage = 'Could not fetch now played movies';
  const nowPlayedMovies = await fetchDB(url, errorMessage).then((response) => {
    const totalPages = response.total_pages;
    const movies = response.results
      .map((movie) => {
        const details = getDetails(movie);
        const date = details.releaseDate.toLocaleString('ru', {
          month: 'long',
          day: 'numeric',
        });

        return {
          imgSrc: getImage(movie.backdrop_path, 'original'),
          date,
          ...details,
        };
      })
      .filter((movie) => movie.imgSrc);

    return {
      totalPages,
      movies,
    };
  });

  return nowPlayedMovies;
};

const searchMulti = async (searchValue, page, lang = 'ru') => {
  const url = `${searchUrl}${searchValue}&${apiKey}${langURL[lang]}&page=${page}`;
  const errorMessage = `Could not fetch ${searchValue}`;

  const getPersonDetails = (item) => {
    return {
      posterSrc: getImage(item.profile_path),
      title: item.name,
      id: item.id,
    };
  };

  const results = await fetchDB(url, errorMessage).then((response) => {
    const items = response.results.map((item) => {
      const details =
        item.media_type === 'movie'
          ? getDetails(item)
          : item.media_type === 'tv'
          ? getShowDetails(item)
          : getPersonDetails(item);
      return {
        ...details,
        type: item.media_type,
      };
    });
    const totalResults = response.total_results;
    const maxPages = response.total_pages;

    return {
      totalResults,
      maxPages,
      items,
    };
  });

  return results;
};

const discover = async (
  type = 'movie',
  options,
  random = true,
  lang = 'ru'
) => {
  let optionsQuery = '';

  for (const prop in options) {
    if (options[prop]) {
      optionsQuery += `&${prop}=${options[prop]}`;
    }
  }

  const url = `${discoverUrl}${type}?${apiKey}${langURL[lang]}${optionsQuery}`;
  const errorMessage = `Could not fetch discover movie`;

  const setDetails = (response) => {
    const items = response.results
      .filter((item) => item.media_type !== 'person')
      .map((item) => {
        const details =
          type === 'movie'
            ? getDetails(item, true)
            : getShowDetails(item, true);
        return {
          ...details,
          type,
        };
      });
    const totalResults = response.total_results;
    const maxPages = response.total_pages;

    return {
      totalResults,
      maxPages,
      items,
    };
  };

  const discoverItems = await fetchDB(url, errorMessage).then(
    async (response) => {
      if (random) {
        const startTime = parseInt(
          options[
            type === 'movie' ? 'primary_release_date.gte' : 'air_date.gte'
          ].slice(0, 4),
          10
        );
        const endTime = parseInt(
          options[
            type === 'movie' ? 'primary_release_date.lte' : 'air_date.lte'
          ].slice(0, 4),
          10
        );
        const maxPages = endTime > 1960 && endTime - startTime > 30 ? 80 : 45;

        const endPageNumber =
          response.total_pages > maxPages ? maxPages : response.total_pages;
        const randomPage = getRandomNumber(1, endPageNumber);
        const randomUrl = `${url}&page=${randomPage}`;
        return await fetchDB(randomUrl, errorMessage).then((response) =>
          setDetails(response)
        );
      } else {
        return setDetails(response);
      }
    }
  );

  return await discoverItems;
};

const getPerson = async (id, lang = 'ru') => {
  const personFetchUrl = `${personUrl}${id}?${apiKey}${langURL[lang]}`;
  const personErrorMessage = `Could not fetch person data from person ID ${id}`;
  const creditUrl = `${personUrl}${id}/combined_credits?${apiKey}${langURL[lang]}`;
  const creditsErrorMessage = `Could not fetch person credits data from person ID ${id}`;

  const comparePopularity = (a, b) => {
    const aPopularity = parseFloat(a.popularity);
    const bPopularity = parseFloat(b.popularity);

    if (aPopularity > bPopularity) {
      return -1;
    }
    if (aPopularity < bPopularity) {
      return 1;
    }

    return 0;
  };

  const getDate = (dateString, lang = 'ru') => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return dateString
      ? new Date(dateString).toLocaleString(lang, options)
      : null;
  };

  const person = await fetchDB(personFetchUrl, personErrorMessage).then(
    (response) => {
      return {
        birthDate: getDate(response.birthday),
        deathDate: getDate(response.deathday),
        biography: response.biography,
        name: response.name,
        alsoKnow: [...new Set(response.also_known_as)].join(', '),
        img: getImage(response.profile_path),
        homepage: response.homepage,
        placeOfBirth: response.place_of_birth,
        gender: response.gender,
      };
    }
  );

  const credits = await fetchDB(creditUrl, creditsErrorMessage).then(
    (response) => {
      const allCredits = [...response.crew, ...response.cast]
        .sort(comparePopularity)
        .map((item) => {
          return {
            popularity: item.popularity,
            img: getImage(item.poster_path),
            title: item.title ? item.title : item.name,
            originalTitle: item.original_title
              ? item.original_title
              : item.original_name,
            type: item.media_type,
            id: item.id,
            character: item.character,
          };
        })
        .filter(
          (item) =>
            item.character &&
            item.title !== 'Шоу Грэма Нортона' &&
            item.title !== 'Субботним вечером в прямом эфире'
        );

      return allCredits;
    }
  );

  return {
    person,
    credits,
  };
};

const getCredits = async (id, lang = 'ru', isShow = false) => {
  const mainPath = isShow ? tvUrl : movieUrl;
  const url = `${mainPath}${id}/credits?${apiKey}${langURL[lang]}`;
  const errorMessage = `Could not fetch credits for movie id ${id}`;
  const credits = await fetchDB(url, errorMessage).then((response) => {
    const crew = response.crew
      .filter(
        (person) =>
          person.job === 'Producer' ||
          person.job === 'Director' ||
          person.job === 'Story'
      )
      .map((person) => {
        return {
          id: person.id,
          job: person.job,
          name: person.name,
          img: getImage(person.profile_path),
        };
      });
    const actors = response.cast.map((person) => {
      return {
        id: person.id,
        character: person.character,
        name: person.name,
        img: getImage(person.profile_path),
      };
    });

    return {
      crew: removeDuplicates(crew, 'id'),
      actors: removeDuplicates(actors, 'id'),
    };
  });

  return credits;
};

export default {
  getAllCountries,
  getAllGenres,
  getMovie,
  getShowAllData,
  getSimilarMovies,
  getSimilarShow,
  getBackdropMovie,
  getBackdropShow,
  getTrailer,
  getShowTrailers,
  getPopularMovies,
  getPopularShows,
  getPlayedMoviesNow,
  searchMulti,
  discover,
  getPerson,
  getCredits,
};
