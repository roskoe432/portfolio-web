import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import styles from './stylesheet';

function MyDocument({ data }) {
	const { t } = useTranslation();

	const renderSkillsCategory = (category, skills) => {
		return (
			<View style={{ marginBottom: 8 }} key={category}>
				<Text style={styles.subsectionTitle}>{category}</Text>
				{skills.map((skill, index) => (
					<Text key={index} style={styles.text}>
						• {skill}
					</Text>
				))}
			</View>
		);
	};

	return (
		<Document
			title={`${t('pages.resume.resume')} - Benjamin Snow`}
			author="Benjamin Snow"
		>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.name}>{data.header.name}</Text>
					<Text style={styles.contact}>
						{data.header.contact.map((item, i) => (
							<Text key={i}>
								{i > 0 && ' | '}
								{item.href ? (
									<Link src={item.href} style={styles.link}>
										{item.text}
									</Link>
								) : (
									item.text
								)}
							</Text>
						))}
					</Text>
				</View>
				{
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>SKILLS</Text>
						{Object.keys(data.skills).map((category) =>
							renderSkillsCategory(category, data.skills[category]),
						)}
					</View>
				}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>EXPERIENCE</Text>

					{data.experience.map((job, index) => (
						<View key={index} style={{ marginBottom: 12 }}>
							<Text style={styles.subsectionTitle}>
								{job.company} — {job.title} | {job.period}
							</Text>

							<View style={styles.bulletList}>
								{job.responsibilities.map((item, i) => (
									<Text key={i} style={styles.bullet}>
										• {item}
									</Text>
								))}
							</View>
						</View>
					))}
				</View>{' '}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>EDUCATION</Text>

					{data.education.map((edu, index) => (
						<View key={index} style={{ marginBottom: 8 }}>
							<Text style={styles.subsectionTitle}>
								{edu.school} | {edu.location} | {edu.period}
							</Text>
							<Text style={styles.text}>{edu.degree}</Text>
						</View>
					))}
				</View>{' '}
			</Page>
		</Document>
	);
}

export default MyDocument;
