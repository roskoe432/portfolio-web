import GameContainer from '@/app/game-container/game-container';
import PageModal from '@/pages/page-modal/page-modal';
import styles from './app.module.less';
import config from '@/config';
import useServerConnection from '@/shared/store/useServerConnection';
import React from 'react';
import Loading from '@/shared/components/loading';
import Error from '@/shared/components/error';

function App() {
	const { isLoading, error, checkServerConnection } = useServerConnection();

	React.useEffect(() => {
		checkServerConnection();
	}, [checkServerConnection]);

	if (isLoading) {
		return <Loading message="Checking server connection..." />;
	}

	if (error) {
		return <Error message="Failed to connect to the server. Please try again later." />;
	}

	return (
		<div className={styles.app}>
			{config.game.enabled && <GameContainer />}
			<PageModal />
		</div>
	);
}

export default App;
