function EmailService(url) {
	this.url = url;

	this.sendEmail = async (formData) => {
		try {
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
		} catch (error) {
			console.error('Error sending email:', error);
			throw error;
		}
	};
}

export default EmailService;
