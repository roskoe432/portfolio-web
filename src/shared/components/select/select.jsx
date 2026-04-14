import styles from './select.module.less';

function Select({ options, value, onChange, defaultValue }) {
	return (
		<select
			defaultValue={defaultValue}
			className={styles.select}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{options.map((option) => (
				<option className={styles.option} key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}

export default Select;
