import { useState } from 'react';
import styles from './contact.module.less';
import config from '@/config';

const MailtoLink = (props) => (
	<a
		href={`mailto:${props.email}?subject=${encodeURIComponent('Job Inquiry')}&body=${encodeURIComponent(props.message)}`}
	>
		Contact Support
	</a>
);

function ContactPage() {
	const [formData, setFormData] = useState({
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the form data to your server or an email service
		console.log('Form submitted:', formData);
		alert('Thank you for your message! I will get back to you soon.');
		setFormData({ message: '' });
	};

	return (
		<div className={styles.contactPage}>
			<p>You can reach me at:</p>
			<MailtoLink email={config.email} message={formData.message} />
			<p>Or send me a message directly:</p>
			<form onSubmit={handleSubmit} className={styles.contactForm}>
				<textarea
					name="message"
					value={formData.message}
					onChange={handleChange}
					placeholder="Your message"
					required
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default ContactPage;
