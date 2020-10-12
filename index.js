const autoCompleteRender = {
	renderOptions(movie) {
		//NOTE Handle broken Image setting it to default images
		const ImageSrc =
			movie.Poster === 'N/A'
				? 'http://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg'
				: movie.Poster;
		return `
				<img src="${ImageSrc}" />
				${movie.Title}
			  `;
	},
	onOptionSelect(movie) {
		// Hide my tutorial button is Hidden is bulma css property
		document.querySelector('.rules').classList.add('is-hidden');

		onMovieSelect(movie);
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchMovie(searchData) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: 'f8646cb9',
				s: searchData,
			},
		});

		if (response.data.Error) {
			return alert('Movie Not Found');
		} else if (response.data.Search === '') {
			return [];
		} else {
			return response.data.Search;
		}
	},
};

autoComplete({
	...autoCompleteRender,
	auto: document.querySelector('#left-autocomplete'),

	onOptionSelect(movie) {
		// Hide my tutorial button is Hidden is bulma css property
		document.querySelector('.rules').classList.add('is-hidden');
		//NOTE Add movieinfo id I create in html as the second argument
		onMovieSelect(movie, document.querySelector('#left-movieInfo'), "left");
	},
});
autoComplete({
	...autoCompleteRender,
	auto: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		// Hide my tutorial button is Hidden is bulma css property
		document.querySelector('.rules').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-movieInfo'), "right");
	},
});


let rightMovie;
let leftMovie;


//NOTE Single Movie Request
onMovieSelect = async (movie, movieInfo, side) => {
	const singleMovie = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f8646cb9',
			i: movie.imdbID,
		},
	});
	movieInfo.innerHTML = movieinfo(singleMovie.data);
	 
	if (side === 'left') {
		leftMovie = singleMovie.data;
	  } else {
		rightMovie = singleMovie.data;
	  }
	
	  if (leftMovie && rightMovie) {
		runComparison();
	  }
	};
	
	const runComparison = () => {
		const leftSideStats = document.querySelectorAll(
		  '#left-movieInfo .profile'
		);
		const rightSideStats = document.querySelectorAll(
		  '#right-movieInfo .profile'
		);
	  
		leftSideStats.forEach((leftStat, index) => {
		  const rightStat = rightSideStats[index];
	  
		  const leftSideValue = leftStat.dataset.value;
		  const rightSideValue = rightStat.dataset.value;
	  
		  if (rightSideValue > leftSideValue) {
			rightStat.style.backgroundColor = 'Cyan';
			
		  } else {
			leftStat.style.backgroundColor = 'Cyan';
			
		  }
		});
	  };
	

const movieinfo = (movieDetail) => {
	//NOTE Removing string around meta score so I can compare
	const metascore = parseInt(movieDetail.Metascore)
	console.log(metascore)
	const imdbVotes = parseFloat(movieDetail.imdbVotes.replace (/,/g,''))
	console.log(imdbVotes)
	const rating = parseFloat(movieDetail.imdbRating)
	console.log(rating)
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
	
		if (isNaN(value)) {
		  return prev;
		} else {
		  return prev + value;
		}
	  }, 0);
	  console.log(awards)

	return `
<div class="profile-card">
    <div class="container-profile-image">
      <img class="profile-image" src="${movieDetail.Poster}"/> 
    </div>
    <div>
      <p class=" profile-name">${movieDetail.Title}</p>
      <p class=" profile-address">${movieDetail.Genre}</p>
      <p data-value=${rating} class="profile profile-ratings"><b>IMDB Rating</b>
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
	   ${movieDetail.imdbRating}</p>
	 <div data-value=${imdbVotes}  class="profile  profile-description"><b>IMDB Votes</b>: ${movieDetail.imdbVotes}</div>
	  <p data-value=${awards}  class=" profile profile-description" ><b> Awards</b>: ${movieDetail.Awards}</p>
	  <p data-value=${metascore}  class="profile  profile-description"><b>MetaScore</b>: ${movieDetail.Metascore}</p>
     <p class="profile-description">${movieDetail.Plot}</p>
	 
     
    </div>
</div>

`;
};
