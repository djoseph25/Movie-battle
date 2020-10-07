const fetchMovie = async (searchData) => {
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
};

const auto = document.querySelector('.autocomplete');
auto.innerHTML = `
	<h1><b>Search For a Movie</b></h1>
	<input class="input" />
	<div class="dropdown">
	  <div class="dropdown-menu">
		<div class="dropdown-content results"></div>
	  </div>
	</div>
  `;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const dropdownResult = document.querySelector('.results');

//ANCHOR I Need to set a timeout function so my inout does not run on every key press

const onInput = async (event) => {
	const movies = await fetchMovie(event.target.value);
	//NOTE I need to add my is-active to the dropdown const above like boostrap class dropdown is-active
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const options = document.createElement('a');
		//NOTE Handle broken Image setting it to default images
		const ImageSrc =
			movie.Poster === 'N/A'
				? 'http://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg'
				: movie.Poster;

		options.classList.add('dropdown-item');
		options.innerHTML = `
		<img src="${ImageSrc}" />
		${movie.Title}
	  `;
		// NOTE close dropdown after click on the movie and update the text input
		options.addEventListener('click', () => {
			//Closed the dropdown
			dropdown.classList.remove('is-active');
			//grab the movie title udate the input
			input.value = movie.Title;
		});

		dropdownResult.appendChild(options);
	}
};
// NOTE Passing in my helper function and setting a delay directly in here calling onInput as the first argument and delay as second arg
input.addEventListener('input', waitFunc(onInput, 1000));

//NOTE close dropdown when i click outside the  dropdown

document.addEventListener('click', (event) => {
	// console.log(event.target);
	!auto.contains(event.target);
	//NOTE set dropdown to unactive
	dropdown.classList.remove('is-active');
});
