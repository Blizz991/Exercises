// gets the Json data
async function getJson() {
	const jsonData = await fetch('./data.json')
	// const jsonData = await fetch('https://jsonplaceholder.typicode.com/posts/1')
	let data = await jsonData.json()
	//   console.log(data)
	return data.movies
}



// call the json function
getJson().then((jsonMovie) => {
	const movies = document.querySelectorAll('.movie')

	// gets poster data from json and appends it
	getPoster(jsonMovie)

	// click event on poster to show the poster data
	movies.forEach((movie) => {
		movie.addEventListener('click', (e) => {
			// shows the modal
			const modal = document.querySelector('.modal')
			modal.style.display = 'block'

			// gives the modal the data of the clicked button
			const movieTitle = movie.querySelector('.movie__title').innerText
			let postermovie = jsonMovie.find((e) => movieTitle === e.title)
			modal.querySelector('.modal__title').innerHTML = postermovie.title
			modal.querySelector('.modal__release-date').innerHTML = postermovie.releaseDate
			modal.querySelector('.modal__budget').innerHTML = postermovie.budget
			modal.querySelector('.modal__box-office').innerText = postermovie.boxOffice
			modal.querySelector('.modal__description').innerText = postermovie.description
			modal.querySelector('.modal__video').src += postermovie.youtubeId
            
        })
	})
})

// Button for removeing the modal
const button = document.querySelector('.modal__button')
button.addEventListener('click', () => {
	const modal = document.querySelector('.modal')
	modal.style.display = 'none'
    modal.querySelector(".modal__video").src = "https://www.youtube.com/embed/"
})

// function thats gets the movie data and append it to the posters
function getPoster(movie) {
	const movies = document.getElementsByClassName('movie')
	let antal = movies.length
	for (let i = 0; i < antal; i++) {
		if (i < movie.length) {
			const img = movies[i].getElementsByClassName('movie__img')
			const title = movies[i].getElementsByClassName('movie__title')
			const info = movies[i].getElementsByClassName('movie__info')
			img[0].src = movie[i].img
			title[0].innerText = movie[i].title
			info[0].innerText = `${movie[i].info.year} - ${movie[i].info.Genre} - ${movie[i].info.Scrrentime} `
		} else {
			movies[movie.length].remove()
		}
	}
}

// laver posters, men mangler data i json file

// getJson().then(movie => {
//       movie.forEach(e => {
// const artical = document.createElement("article")
// artical.classList.add("movie")

// const img = document.createElement("img")
// img.classList.add("movie__img")
// img.src = e.img

// const header = document.createElement("header")
// header.classList.add("movie__title")
// header.innerText = e.title

// const paragraf = document.createElement("p")
// paragraf.classList.add("movie__data")
// paragraf.innerText = `Year - Genre - Screentime`

// const container = document.getElementsByClassName("movies")
// container[0].appendChild(artical)

// artical.appendChild(img)
// artical.appendChild(header)
// artical.appendChild(paragraf)
//       });
//   })
