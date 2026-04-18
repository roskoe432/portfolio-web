import { useTranslation } from 'react-i18next';
import styles from './contact.module.less';
import { useEmailMutation } from './contactQueries';
import { getErrorMessageFromStatus } from '@shared/utils/helpers';
import { useForm } from 'react-hook-form';

function ContactPage({ closePageModal }) {
	const { t } = useTranslation();

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
				<p className={`${styles.successMessage} ${styles.centeredMessage}`}>
					{t('pages.contact.successMessage')}
				</p>
				<button className={styles.okBtn} onClick={closePageModal}>
					{t('pages.contact.ok')}
				</button>
			</div>
		);
	}

	return (
		<div className={styles.contactPage}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
				<div className={styles.field}>
					<label htmlFor="email">{t('pages.contact.emailLabel')}</label>
					<input
						placeholder={t('pages.contact.emailPlaceholder')}
						{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
					/>
				</div>
				{errors.email && (
					<span className={styles.errorMessage}>
						{t('pages.contact.emailError')}
					</span>
				)}
				<div className={styles.field}>
					<label htmlFor="subject">{t('pages.contact.subjectLabel')}</label>
					<input
						type="text"
						placeholder={t('pages.contact.subjectPlaceholder')}
						{...register('subject', { required: true })}
					/>
				</div>
				{errors.subject && (
					<span className={styles.errorMessage}>
						{t('pages.contact.subjectError')}
					</span>
				)}
				<div className={styles.field}>
					<label htmlFor="message">{t('pages.contact.messageLabel')}</label>
					<textarea
						placeholder={t('pages.contact.messagePlaceholder')}
						{...register('message', { required: true, maxLength: 500 })}
					/>
				</div>
				{errors.message && errors.message.type === 'required' && (
					<span className={styles.errorMessage}>
						{t('pages.contact.messageError')}
					</span>
				)}
				<button type="submit" disabled={isPending}>
					{isPending ? t('pages.contact.sending') : t('pages.contact.send')}
				</button>
				{error && (
					<p className={`${styles.errorMessage} ${styles.centeredMessage}`}>
						{errorMessage}
					</p>
				)}
				{isSuccess && (
					<p className={`${styles.successMessage} ${styles.centeredMessage}`}>
						{t('pages.contact.successMessage')}
					</p>
				)}
			</form>
		</div>
	);
}

export default ContactPage;
