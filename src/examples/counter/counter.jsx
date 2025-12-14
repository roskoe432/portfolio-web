import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mantine/core';
import styles from './counter.module.less';
import {
	increment,
	decrement,
	reset,
} from '@shared/store/slices/counter.slice';

function Counter() {
	const count = useSelector((state) => state.counter.count);
	const dispatch = useDispatch();

	return (
		<div className={styles.counter}>
			<div className={styles.display}>
				<h2>Count: {count}</h2>
			</div>
			<div className={styles.buttonGroup}>
				<Button className={styles.button} onClick={() => dispatch(increment())}>
					Increment
				</Button>
				<Button className={styles.button} onClick={() => dispatch(decrement())}>
					Decrement
				</Button>
				<Button className={styles.button} onClick={() => dispatch(reset())}>
					Reset
				</Button>
			</div>
		</div>
	);
}

export default Counter;
