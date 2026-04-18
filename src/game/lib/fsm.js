function State(name, { onExecute, onEnter, onExit }) {
	this.name = name;
	this.onExecute = (...args) => {
		if (onExecute) {
			onExecute(...args);
		}
	};
	this.onEnter = (...args) => {
		if (onEnter) {
			onEnter(...args);
		}
	};
	this.onExit = (...args) => {
		if (onExit) {
			onExit(...args);
		}
	};
}

function FSM(onStateChange) {
	this.current = '';
	this.states = new Set();

	const _onStateChange = onStateChange || (() => {});

	this.addState = (state) => {
		this.states.add(state);
	};

	this.add = (name, { onExecute, onEnter, onExit }) => {
		const state = new State(name, { onExecute, onEnter, onExit });
		this.addState(state);
	};

	this.setState = (next) => {
		if (!this.states.has(next)) {
			throw new Error(`State ${next} does not exist in FSM`);
		}

		const currentState = this.states.get(this.current);
		if (currentState) {
			currentState.onExit();
		}

		_onStateChange(this.current, next);

		this.current = this.states.get(next);
		this.current.onEnter();
	};

	this.execute = (...args) => {
		const currentState = this.states.get(this.current);
		if (!currentState) {
			throw new Error(`Current state ${this.current} does not exist in FSM`);
		}

		const next = currentState.onExecute(...args);
		if (next) {
			this.setState(next);
		}
	};
}

export default FSM;
