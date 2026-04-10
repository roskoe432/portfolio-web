export const getErrorMessageFromStatus = (response) => {
	switch (response.status) {
		case 400:
			return 'Please check your input and try again.';
		case 429:
			return 'You have sent too many messages in a short period. Please wait and try again later.';
		default:
			return `An Error has occured`;
	}
};
