function env() {
	let env;
	if(process.env.NODE_ENV === 'production') {
		if(window.env !== undefined) {
			env = window.env;
		} else {
			env = process.env.NODE_ENV
		}
	} else {
		env = process.env.NODE_ENV
	}
	return env;
}

export default env;