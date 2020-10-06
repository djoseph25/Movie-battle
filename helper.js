//NOTE Pass in default value for delay

const waitFunc = (callback, delay) => {
	let timeoutId;
	//NOTE ...Arg is going to take all the argument pass in
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			//NOTE Apply mean take every argument that is pass and run it.
			callback.apply(null, args);
		}, delay);
	};
};
