import { useState } from 'react';
import styles from './contact.module.less';

function ContactPage() {
	const [formData, setFormData] = useState({
		senderEmail: '',
		subject: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className={styles.contactPage}>
			<div className={styles.header}>
				<h1>Contact</h1>
			</div>
			<form onSubmit={handleSubmit} className={styles.contactForm}>
				<div className={styles.field}>
					<label htmlFor="senderEmail">Your Email</label>
					<input
						id="senderEmail"
						type="email"
						name="senderEmail"
						value={formData.senderEmail}
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
				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default ContactPage;
