const movieFetch = async (searchData) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f8646cb9',
			s: searchData,
		},
	});
	console.log(response.data);
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

let timeoutId;
const onInput = (event) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		movieFetch(event.target.value);
	}, 500);
};

input.addEventListener('input', onInput);
