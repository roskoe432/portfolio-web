import { Modal } from 'react-overlays';
import useGallery from '@/shared/components/gallery/useGallery';
import styles from './gallery.module.less';

function Gallery({ canView, onComplete, components }) {
	const { nextItem, getCurrentItem } = useGallery(canView, onComplete);
	const CurrentComponet = getCurrentItem(components);

	return (
		<Modal className={styles.gallery} show={!!CurrentComponet} onHide={nextItem}>
			{CurrentComponet}
		</Modal>
	);
}

export default Gallery;
