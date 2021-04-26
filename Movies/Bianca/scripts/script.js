const APIKEY = 'https://www.omdbapi.com/?apikey=417c0225&';

var movies =["tt1536537","tt1677720","tt0482571","tt0120737","tt0167261", "tt2084970"];
// var mvTitles = ["The Imitation Game",
// "The Prestige", 
// "Fellowship of the Ring",
// "The Two Towers",
// "What Happened to Monday",
// "Ready Player One"];
var idIMDB = APIKEY + 'plot=full&i=';
var searchByName = APIKEY + 's=';
let dataset;
var i = 0;
movies.forEach(title => {
getData(title, i);
});
function getData(title){
    //console.log(searchByName + title );
    fetch(idIMDB + title)
    .then(response => response.json())
    .then(data => dataset = data) 
    .then(jData => {
    console.log(jData);
    title = jData.Title;
    year = jData.Year;
    desc = jData.Plot;
    release = jData.Released;
    budget = jData.BoxOffice;
    //console.log(jData.BoxOffice);
    gender = jData.Genre;
    img = jData.Poster;
    screenT = jData.Runtime;
    id = i++;
    ytId = "#";

    function generateMovieItem(title, ytId, release, budget, desc, gender, img, screenT, id){
        var outM="";
        var outPoP="";
        var result="";
        var year = new Date(release);
        outM += '<article class="movieItem" id="mv' + id + '" onclick="openInfos(this.id)">';
        outM += '<img class="itemImage" src="' + img + '" alt="' + title + '">';
        outM += '<h2 class="itemTitle">' + title + '</h2>';
        outM += '<p class="itemShortDetails"><span>' + year.getFullYear() + '</span> &#x26AC; <span>' +gender + '</span> &#x26AC; <span>' + screenT + '</span></p>';
        outM += '</article>';
        
        outPoP += '<div class="pop" id="pop_mv' + id + '"  onclick="closeInfos(this.id)">';
        outPoP += '<div class="popInfos">';
        outPoP += '<div class="popTrailerTitle">';
        outPoP += '<p class="trailerTtitle">' + title + '</p>';
        outPoP += '<span class="popClose">&times;</span>';
        outPoP += '</div>';
        outPoP += '<div class="popVideoTrailer">';
        outPoP += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + ytId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        outPoP += '</div>';
        outPoP += '<div class="popMovieDetails">';
        outPoP += '<p class="detailsKey">Release Date: <span class="detailDetail">' + release + '</p>';
        outPoP += '<p class="detailsKey">Budget: <span class="detailDetail">' + budget + '</p>';
        outPoP += '<p class="detailsKey">Description: <span class="detailDetail">' + desc + '</p>';
        outPoP += '</div>';
        outPoP += '</div>';
        outPoP += '</div>';
        result = [outM,outPoP];
        return result;
    }
    document.getElementById('latest').innerHTML += generateMovieItem(title, ytId, release, budget, desc, gender, img, screenT, i)[0];
    document.getElementById('latest').innerHTML += generateMovieItem(title, ytId, release, budget, desc, gender, img, screenT, i)[1];    
});
}
// the first button in the class to close / for easy use
var closeBTN = document.getElementsByClassName('popClose')[0];
//open the infos
function openInfos(id){
    var o = document.getElementById('pop_'+id);
    o.style.display="flex";
}
//close the infos
function closeInfos(id){
    var c = document.getElementById(id);
    c.style.display="none";
}