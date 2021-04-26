// Setting this variable globally so we can access it to push movie details to the modal
let movies;
const apiKey = 'e61d762e';
const apiUrl = 'https://www.omdbapi.com/'

//Get movies our local JSON - we include the parameter callback,
//to define which function we should callback to once we have fetched the data from the json
getDataFromLocalJson('assets/data/movies.json', appendMoviesToDOM);

//TODO?: Close modal when clicking outside of it (i.e. make it dismissible) - outside of scope for this assignment.

function toggleModal() {
  $('body').classList.toggle('modalOpen');
  //Force video to stop playing when modal is closed - we could do this in a nicer way if we used the youtube API.
  $('modalTrailer').setAttribute('src', '')
}

//Get data from our local json
function getDataFromLocalJson(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => movies = data)
    .then(() => callback(movies))
}

function getMovieInfoFromAPI(url, youtubeId) {
  fetch(url)
    .then(res => res.json())
    .then(data => populateModalData(youtubeId, data))
}

function appendMoviesToDOM(movies) {
  movies.forEach((movie, i) => {
    let movieTemplate = $('movieTemplate').innerHTML;
    let movieContainer = $('movieContainer');
    //This assumes images were named correctly ¯\_(ツ)_/¯
    let imgSrc = `assets/images/${movies[i].title.toLowerCase().replaceAll(' ', '-').replaceAll(':', '')}.jpg`;

    //create single movie from template using replace
    movieTemplate = movieTemplate
      .replace('##movieId##', i)
      .replace('##imgsrc##', imgSrc)
      .replace('##title##', movies[i].title);
    movieContainer.innerHTML += movieTemplate;
  })
}

function onClickOpenMovieModal(element) {
  let movie = movies[element.dataset.movieId];
  let movieModal = document.getElementById('movieModal');
  getMovieInfoFromAPI(`${apiUrl}?t=${movie.title}&apikey=${apiKey}`, movie.youtubeId)
  
}

function populateModalData(youtubeId, movie) {
  $('modalTitle').innerText = movie.Title;
  $('modalReleased').innerText = `${time_ago(Date.parse(movie.Released))} (${movie.Released})`;
  $('modalRuntime').innerText = movie.Runtime;
  $('modalBoxOffice').innerText = movie.BoxOffice;
  $('modalIMDBRating').innerText = movie.imdbRating;
  $('modalPlot').innerText = movie.Plot;
  toggleModal();
  $('modalTrailer').setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`)
}


// moment.js would honestly have been prettier at this point, or just using the timeago plugin for jquery
function time_ago(time) {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

// GIVE ME JQUERY!!!!!! :(
// I really can't be arsed writing document.getElementById one more time.
function $(id) {
  return document.getElementById(id);
}
