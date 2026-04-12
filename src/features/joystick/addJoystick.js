import nipplejs from 'nipplejs';

const addJoystick = () => {
	const joystick = nipplejs.create({
		zone: document.getElementById('joystick-zone'),
		mode: 'static',
		position: { left: '50px', bottom: '50px' },
		color: {
			front: 'linear-gradient(135deg, #818cf8, #38bdf8)',
			back: 'rgba(99, 102, 241, 0.12)',
		},
	});

	joystick.on('move', (evt, data) => {
		console.log('Joystick moved:', data);
		console.log('Evt:', evt);
	});

	joystick.on('end', () => {
		console.log('Joystick released');
	});
};

export default addJoystick;
