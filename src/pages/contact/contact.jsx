import { useState } from 'react';
import styles from './contact.module.less';
import { useEmailMutation } from './contactQueries';
import { getErrorMessageFromStatus } from '@/shared/utils/helpers';

function ContactPage() {
	const { mutate, isPending, isSuccess, error } = useEmailMutation();
	const [formData, setFormData] = useState({
		email: '',
		subject: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
	};

	const errorMessage = error ? getErrorMessageFromStatus(error.cause) : null;

	return (
		<div className={styles.contactPage}>
			<div className={styles.header}>
				<h1>Contact</h1>
			</div>
			<form onSubmit={handleSubmit} className={styles.contactForm}>
				<div className={styles.field}>
					<label htmlFor="email">Your Email</label>
					<input
						id="email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="you@example.com"
						required
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="subject">Subject</label>
					<input
						id="subject"
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="What's this about?"
						required
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="message">Message</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder="Your message"
						required
					/>
				</div>
				<button type="submit" disabled={isPending}>
					{isPending ? 'Sending...' : 'Send'}
				</button>
				{error && <p className={styles.errorMessage}>{errorMessage}</p>}
				{isSuccess && <p className={styles.successMessage}>Message sent successfully!</p>}
			</form>
		</div>
	);
}

export default ContactPage;
