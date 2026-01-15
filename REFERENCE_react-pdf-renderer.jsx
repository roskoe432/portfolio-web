/**
 * REFERENCE FILE - @react-pdf/renderer Resume Implementation
 *
 * This file contains all the code from the @react-pdf/renderer implementation
 * consolidated into a single file for reference purposes.
 *
 * To use in a new project:
 * 1. Install dependencies: npm install @react-pdf/renderer react-i18next
 * 2. Split this file into separate components as needed
 * 3. Update the data.json with your resume information
 * 4. Customize styles as needed
 */

// ============================================================================
// DEPENDENCIES
// ============================================================================
import {
	PDFViewer,
	PDFDownloadLink,
	Document,
	Page,
	Text,
	View,
	Link,
	StyleSheet,
} from '@react-pdf/renderer';
import { Button } from '@mantine/core'; // or your preferred UI library
import { useTranslation } from 'react-i18next';

// ============================================================================
// DATA STRUCTURE (data.json)
// ============================================================================
const resumeData = {
	header: {
		name: 'Benjamin R. Snow',
		contact: [],
	},
	skills: {
		Frontend: [
			'React, Redux, Vue, TypeScript, JavaScript, HTML5/CSS3, LESS',
			'Mobile Development: React Native, Expo',
			'UI Libraries: Mantine UI, Ant Design, Material UI',
			'Build Tools: Vite, Webpack, Babel',
			'Testing: Jest, Vitest, React Testing Library',
			'Localization: i18n/Internationalization',
			'Micro-Frontend Architecture, Responsive and Semantic Web Design',
		],
		Backend: [
			'.NET Core, C#, C++, Node.js, Express',
			'RESTful API Development',
			'Azure Entra ID, Authentication & Authorization',
			'IaC, Terraform, Azure',
			'Microservice Architecture',
		],
		'DevOps & Tools': [
			'Azure DevOps, GitHub, GitHub Actions, CI/CD Pipelines',
			'Docker, Nginx',
			'Git, Visual Studio, VS Code',
			'Electron',
		],
	},
	experience: [
		{
			company: 'Prometric',
			title: 'Software Engineer',
			period: 'Apr 2019 - Present',
			responsibilities: [
				'Developed and maintained Electron desktop applications for secure exam delivery in test centers and third-party client integrations with Prometric APIs',
				'Built responsive user interfaces using Vue.js and React for desktop and web-based exam administration platforms',
				'Designed and implemented RESTful APIs using .NET Core and Express frameworks for backend services',
				'Led migration of 18 APIs/services from Okta to Azure Entra ID (formerly Azure AD) for enterprise authentication and authorization',
				'Architected micro-frontend solutions for centralized web applications, improving modularity and team scalability',
				'Configured and maintained CI/CD pipelines in Azure DevOps for automated builds, testing, and deployments',
				'Implemented state management solutions using Redux for complex application data flows',
				'Styled applications using CSS, LESS, and modern CSS preprocessors',
				'Configured build tools including Webpack and Vite to optimize bundle sizes and build performance',
			],
		},
	],
	education: [
		{
			school: 'Full Sail University',
			location: 'Winter Park, Florida',
			period: 'September 2013 – May 2016',
			degree: 'Bachelor of Science in Game Design',
		},
		{
			school: 'Black River Technical College',
			location: 'Pocahontas, Arkansas',
			period: 'August 2012 – May 2013',
			degree: 'General Education',
		},
	],
};

// ============================================================================
// STYLESHEET (my-document.stylesheet.js)
// ============================================================================
const styles = StyleSheet.create({
	page: {
		padding: 40,
		backgroundColor: '#ffffff',
	},
	header: {
		marginBottom: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	contact: {
		fontSize: 10,
		color: '#666',
	},
	link: {
		color: '#1976d2',
		textDecoration: 'none',
	},
	section: {
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 8,
		borderBottom: '1px solid #000',
		paddingBottom: 3,
	},
	subsectionTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	text: {
		fontSize: 10,
		lineHeight: 1.5,
	},
	bulletList: {
		marginLeft: 15,
	},
	bullet: {
		fontSize: 10,
		marginBottom: 3,
	},
});

// ============================================================================
// PDF DOCUMENT COMPONENT (my-document.jsx)
// ============================================================================
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
						{data.header.contact &&
							data.header.contact.map((item, i) => (
								<Text key={i}>
									{i > 0 && ' | '}
									{item.href ? (
										<Link src={item.href} style={styles.link} target="_blank">
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

// ============================================================================
// CUSTOM HOOK (useResume.js)
// ============================================================================
// TODO: Host data.json externally and fetch it here
function useResume() {
	return { data: resumeData };
}

// ============================================================================
// MAIN RESUME COMPONENT (resume.jsx)
// ============================================================================
function Resume() {
	const { t } = useTranslation();
	const { data } = useResume();

	if (!data) {
		return <div>{t('common.error')}</div>;
	}

	return (
		<div className="resume-container">
			{' '}
			{/* Add CSS: display: flex; flex-direction: column; height: 100%; gap: 1rem; */}
			<div className="controls">
				{' '}
				{/* Add CSS: display: flex; justify-content: flex-end; align-items: center; */}
				<PDFDownloadLink
					document={<MyDocument data={data} />}
					fileName="Benjamin_Snow_Resume.pdf"
				>
					{({ loading }) => (
						<Button color="grey" size="compact-xs" loading={loading}>
							{loading
								? t('pages.resume.preparingDownload')
								: t('common.download')}
						</Button>
					)}
				</PDFDownloadLink>
			</div>
			<PDFViewer width="100%" height="700" showToolbar={false}>
				<MyDocument data={data} />
			</PDFViewer>
		</div>
	);
}

export default Resume;

// ============================================================================
// NOTES
// ============================================================================
/**
 * CSS Module Styles (resume.module.less):
 *
 * .resumeContainer {
 *   display: flex;
 *   flex-direction: column;
 *   height: 100%;
 *   gap: 1rem;
 * }
 *
 * .controls {
 *   display: flex;
 *   justify-content: flex-end;
 *   align-items: center;
 *
 *   h1 {
 *     margin: 0;
 *   }
 * }
 */
