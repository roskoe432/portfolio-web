import { StyleSheet } from '@react-pdf/renderer';

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

export default styles;
