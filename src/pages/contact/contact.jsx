import usePageModalStore from '../page-modal/usePageModalStore';
import styles from './contact.module.less';
import { useEmailMutation } from './contactQueries';
import { getErrorMessageFromStatus } from '@/shared/utils/helpers';
import { useForm } from 'react-hook-form';

function ContactPage() {
	const { closeModal } = usePageModalStore();
	const { mutate, isPending, isSuccess, error } = useEmailMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate(data);
	};

	const errorMessage = error ? getErrorMessageFromStatus(error.cause) : null;

	if (isSuccess) {
		return (
			<div className={styles.contactPage}>
				<div className={styles.header}>
					<h1>Contact</h1>
				</div>
				<p className={`${styles.successMessage} ${styles.centeredMessage}`}>
					Message sent successfully!
				</p>
				<button className={styles.okBtn} onClick={closeModal}>
					OK
				</button>
			</div>
		);
	}

	return (
		<div className={styles.contactPage}>
			<div className={styles.header}>
				<h1>Contact</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
				<div className={styles.field}>
					<label htmlFor="email">Your Email</label>
					<input
						placeholder="you@example.com"
						{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
					/>
				</div>
				{errors.email && (
					<span className={styles.errorMessage}>Please enter a valid email address.</span>
				)}
				<div className={styles.field}>
					<label htmlFor="subject">Subject</label>
					<input
						type="text"
						placeholder="What's this about?"
						{...register('subject', { required: true })}
					/>
				</div>
				{errors.subject && <span className={styles.errorMessage}>Subject is required.</span>}
				<div className={styles.field}>
					<label htmlFor="message">Message</label>
					<textarea
						placeholder="Your message"
						{...register('message', { required: true, maxLength: 500 })}
					/>
				</div>
				{errors.message && errors.message.type === 'required' && (
					<span className={styles.errorMessage}>Message is required.</span>
				)}
				<button type="submit" disabled={isPending}>
					{isPending ? 'Sending...' : 'Send'}
				</button>
				{error && (
					<p className={`${styles.errorMessage} ${styles.centeredMessage}`}>{errorMessage}</p>
				)}
				{isSuccess && (
					<p className={`${styles.successMessage} ${styles.centeredMessage}`}>
						Message sent successfully!
					</p>
				)}
			</form>
		</div>
	);
}

export default ContactPage;
