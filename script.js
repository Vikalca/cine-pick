const tmdbKey = '999e86d17a2d26e97b6e6f378e559e2f';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.genres;
    }
  } catch(error) {
    console.log(error);
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } 
  catch (err) {
    console.log(err);
  }
};


const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;