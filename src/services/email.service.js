function EmailService(url) {
	this.url = url;

	this.sendEmail = async (formData) => {
		const response = await fetch(`${this.url}api/v1/messages/email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error(`Failed to send email: ${response.statusText}`, { cause: response });
		}

		return response;
	};
}

export default EmailService;
