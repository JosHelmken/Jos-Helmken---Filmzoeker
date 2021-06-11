import {movies} from './database.js'; // const movies = array 
const getFilter = document.querySelectorAll('input[type="radio"]'); // Getting all the filters
const getSearchInput = document.querySelector('input[type="text"'); // Getting the search box
const getSearchButton = document.querySelector('button[type="submit"'); // Getting the search box
const getMessage = document.querySelector('.message'); // Getting the message wrapper
 

const displayMovies = movieList => {
  if(movieList) {
    const getMovieList = document.querySelector('.grid-container');
    // There are movies to return so work with it
    //console.log(movieList) ;
    movieList.forEach(movie => {
      const movieItem = document.createElement('div');
      const movieLink = document.createElement('a');
      const movieImg = document.createElement('img');

      // create all the elements with the correct atributes 
      movieImg.src = movie.Poster;
      movieLink.setAttribute('href', 'https://www.imdb.com/title/' + movie.imdbID);
      movieLink.setAttribute('target', '_blank');

      // create the list 
      movieLink.appendChild(movieImg);
      movieItem.appendChild(movieLink);
      getMovieList.appendChild(movieItem);
      
    });

  } 
}

// Applying any of the filters //

const setFilterList = filterValue => {
  

  switch (filterValue) {

    case 'avengers':
    case 'x-men':
    case 'princess':
    case 'batman' :  

      const newMovieList = movies.filter(item => item.Title.toLowerCase().includes(filterValue));      
      resetList();
      getMessage.innerHTML = '<h3>Filtered by ' + filterValue + '</h3> (<a onclick="location.reload();">reset filters</a>)';
      displayMovies(newMovieList);      
      break;
    
    case 'new':
       
      const newMovies = movies.filter(item => item.Year >= 2014);
      resetList();
      getMessage.innerHTML = '<h3>New movies from 2014 or later</h3> <a onclick="location.reload();">reset filters</a>';
      displayMovies(newMovies);
      break;
    
    default:
      
      const newMovieSearch = movies.filter(item => item.Title.toLowerCase().includes(filterValue));  
      
      if (Array.isArray(newMovieSearch) && !newMovieSearch.length) {
        getMessage.innerHTML = '<h2>No search result for <strong>' + filterValue + '</strong> are found!</h2>';
        resetList();
        } else {
        resetList();
        getMessage.innerHTML = '<h2>Search results for <strong>' + filterValue + '</strong>:</h2>';
        displayMovies(newMovieSearch);
      }
    
  }
}

// reset list and start with clean one //

const resetList = () => {
  const getMovieList = document.querySelector('.grid-container');
  getMovieList.innerHTML = "";
}

// Filter is selected so filter the movie results   //
getFilter.forEach( item => {
  item.addEventListener('change', event => {
    const filterChoice = event.target.value;
    setFilterList(filterChoice);
  })
})

// search is used so display those results 
getSearchButton.addEventListener('click', () => {
  const searchValue = getSearchInput.value;
  setFilterList(searchValue);
})

getSearchInput.addEventListener('keypress', (event => {
  const searchValue = getSearchInput.value;
  if (event.keyCode === 13) {
    setFilterList(searchValue);
  }
}));


// Default load of the page //
 document.addEventListener('DOMContentLoaded', () => { 
  displayMovies(movies);
  
 });