import styles from './select.module.less';

function Select({ options, value, onChange, defaultValue, label }) {
	return (
		<div className={styles.wrapper}>
			{label && <label className={styles.label}>{label}</label>}
			<select
				defaultValue={defaultValue}
				className={styles.select}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default Select;
