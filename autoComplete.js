const autoComplete = ({auto, renderOptions, onOptionSelect, inputValue, fetchMovie}) => {
auto.innerHTML = `
	<h1><b>Search For a Movie</b></h1>
	<input class="input" />
	<div class="dropdown">
	  <div class="dropdown-menu">
		<div class="dropdown-content results"></div>
	  </div>
	</div>
  `;


const input = auto.querySelector('input');
const dropdown = auto.querySelector('.dropdown');
const dropdownResult = auto.querySelector('.results');

//ANCHOR I Need to set a timeout function so my inout does not run on every key press

const onInput = async (event) => {
	const Items= await fetchMovie(event.target.value);
	//NOTE I need to add my is-active to the dropdown const above like boostrap class dropdown is-active
	dropdown.classList.add('is-active');
	for (let item of Items) {
		const options = document.createElement('a');
		options.classList.add('dropdown-item');
		options.innerHTML = renderOptions(item)
		// NOTE close dropdown after click on the item and update the text input
		options.addEventListener('click', () => {
			//Closed the dropdown
			dropdown.classList.remove('is-active');
			//grab the item title udate the input
			input.value = inputValue(item);
			onOptionSelect(item);
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

}