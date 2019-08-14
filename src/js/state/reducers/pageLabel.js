const pageLabelReducer = (
	state = { display: true, path: "/nowhere", componentName: "NoPage" },
	action
) => {
	switch (action.type) {
		case "SET_LABEL": {
			state = { ...action.payload };
			break;
		}
		default: {
			return state;
		}
	}
	return state;
};

export default pageLabelReducer;
