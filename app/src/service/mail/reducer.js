const reducer = (state = {}, action) => {
	const {type, types, data} = action

	switch (type) {
		case types.send:
			return {...state, message: data}
		case types.getEmail:
			return {...state, email: data}
		default:
			return state
	}
}

export default reducer
