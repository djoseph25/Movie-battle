const movieFetch = async (searchData) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f8646cb9',
			s: searchData,
		},
	});
	return response.data.Search;
};

//NOTE
// movieFetch()
/**  const input = document.querySelector('input');
input.addEventListener('input', (event) => {
movieFetch(event.target.value);
}); 
*/

//ANCHOR I Need to set a timeout function so my inout does not run on every key press

const input = document.querySelector('input');

// TODO  This function bellow only work after 1 second after stop typing so because of that it's only making 1 resquest instad of 1 every key press. Like the Note above

const waitFunc = (callback) => {
	let timeoutId;
	//NOTE ...Arg is going to take all the argument pass in
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			//NOTE Apply mean take every argument that is pass and run it.
			callback.apply(null, args);
		}, 500);
	};
};

const onInput = async (event) => {
	//NOTE need to add await bc i was only response no Data
	const movieData = await movieFetch(event.target.value);

	for (let movie of movieData) {
		const div = document.createElement('div');
		div.innerHTML = `<img src='${movie.Poster}'/> ${movie.Title}, `;
		document.getElementById('target').appendChild(div);
	}
};

input.addEventListener('input', waitFunc(onInput));

// I need to create my loop inside a div
