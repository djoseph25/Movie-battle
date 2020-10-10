autoComplete({
	auto: document.querySelector('.autocomplete'),
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
		
	
	
})


//NOTE Single Movie Request
onMovieSelect = async (movie) => {
	const singleMovie = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f8646cb9',
			i: movie.imdbID,
		},
	});
	document.getElementById('summary').innerHTML = movieinfo(singleMovie.data);
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