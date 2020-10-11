const autoCompleteRender = {
	renderOptions (movie)  {
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
		onOptionSelect (movie) {
			// Hide my tutorial button is Hidden is bulma css property
		 document.querySelector('.rules').classList.add('is-hidden')

			onMovieSelect(movie);
		},
		inputValue (movie){
			return movie.Title
		}, 
	  async	fetchMovie (searchData) 
			 {
				const response = await axios.get('http://www.omdbapi.com/', {
					params: {
						apikey: 'f8646cb9',
						s: searchData,
					},
				});
			
				if (response.data.Error) {
					return alert('Movie Not Found');
				}
			
				return response.data.Search;
			}
}

autoComplete({...autoCompleteRender,
	auto: document.querySelector('#left-autocomplete'),
	
	onOptionSelect (movie) {
		// Hide my tutorial button is Hidden is bulma css property
	 document.querySelector('.rules').classList.add('is-hidden')
	 //NOTE Add movieinfo id I create in html as the second argument
		onMovieSelect(movie,document.querySelector('#left-movieInfo'));
	},
	
})
autoComplete({...autoCompleteRender,
	auto: document.querySelector('#right-autocomplete'),
	onOptionSelect (movie) {
		// Hide my tutorial button is Hidden is bulma css property
	 document.querySelector('.rules').classList.add('is-hidden')
		onMovieSelect(movie,document.querySelector('#right-movieInfo'))
	},
	
})



//NOTE Single Movie Request
onMovieSelect = async (movie, movieInfo) => {
	const singleMovie = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f8646cb9',
			i: movie.imdbID,
		},
	});
	movieInfo.innerHTML = movieinfo(singleMovie.data);
};


const movieinfo = (movieDetail) => {
	return `
<div class="profile-card">
    <div class="container-profile-image">
      <img class="profile-image" src="${movieDetail.Poster}"/> 
    </div>
    <div>
      <p class="profile-name">${movieDetail.Title}</p>
      <p class="profile-address">${movieDetail.Genre}</p>
      <p class="profile-ratings">
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
        <i class="fa fa-star col-yellow"></i>
	   ${movieDetail.imdbRating}</p>
	 <div class="profile-description">${movieDetail.imdbVotes}</div>
	  <p class="profile-description" ><b> Awards</b>: ${movieDetail.Awards}</p>
	  <p class="profile-description"><b>BoxOffice</b>:$ ${movieDetail.BoxOffice}</p>
     <p class="profile-description">${movieDetail.Plot}</p>
	 
     
    </div>
</div>

`;
};
const Awards = movieDetail.Awards === 'N/A'? 'No Award found': movieDetail.Awards