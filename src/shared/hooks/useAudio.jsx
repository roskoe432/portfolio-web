import { useRef, useState, useEffect } from 'react';

function useAudio(src, options = {}) {
	const audioRef = useRef(new Audio(src));
	const [isPlaying, setIsPlaying] = useState(false);

	const play = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};

	const pause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	useEffect(() => {
		const audio = audioRef.current;
		Object.entries(options).forEach(([key, value]) => {
			audio[key] = value;
		});

		const handleEnded = () => setIsPlaying(false);
		audio.addEventListener('ended', handleEnded);

		return () => {
			audio.removeEventListener('ended', handleEnded);
			audio.pause();
		};
	}, [options]);

	return { audioRef, isPlaying, play, pause };
}

export default useAudio;
