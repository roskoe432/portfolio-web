const Vec = (() => {
	function Vec(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	Vec.prototype.add = (other) => new Vec(this.x + other.x, this.y + other.y);
	Vec.prototype.subtract = (other) => new Vec(this.x - other.x, this.y - other.y);
	Vec.prototype.multiply = (scalar) => new Vec(this.x * scalar, this.y * scalar);
	Vec.prototype.divide = (scalar) => new Vec(this.x / scalar, this.y / scalar);
	Vec.prototype.length = () => Math.sqrt(this.x * this.x + this.y * this.y);
	Vec.prototype.normalize = () => {
		const len = this.length();
		return len > 0 ? this.divide(len) : new Vec(0, 0);
	};
	Vec.prototype.dot = (other) => this.x * other.x + this.y * other.y;
	Vec.prototype.angleTo = (other) => Math.atan2(other.y - this.y, other.x - this.x);
	Vec.prototype.rotate = (angle) => {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Vec(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	};
	Vec.prototype.clone = () => new Vec(this.x, this.y);
	Vec.prototype.equals = (other) => this.x === other.x && this.y === other.y;
	Vec.prototype.toString = () => `Vec(${this.x}, ${this.y})`;
	Vec.prototype.lerp = (other, t) =>
		new Vec(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t);

	Vec.prototype.distanceTo = (other) =>
		Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);

	Vec.prototype.angleBetween = (other) => {
		const dot = this.dot(other);
		const lenProduct = this.length() * other.length();
		if (lenProduct === 0) return 0;
		let angle = Math.acos(dot / lenProduct);
		// Determine the sign of the angle using the cross product
		const cross = this.x * other.y - this.y * other.x;
		return cross < 0 ? -angle : angle;
	};
	Vec.prototype.projectOnto = (other) => {
		const otherLenSq = other.x * other.x + other.y * other.y;
		if (otherLenSq === 0) return new Vec(0, 0);
		const dotProduct = this.dot(other);
		const scalar = dotProduct / otherLenSq;
		return new Vec(other.x * scalar, other.y * scalar);
	};
	Vec.prototype.reflect = (normal) => {
		const dotProduct = this.dot(normal);
		return new Vec(this.x - 2 * dotProduct * normal.x, this.y - 2 * dotProduct * normal.y);
	};
	Vec.prototype.perpendicular = () => new Vec(-this.y, this.x);
	Vec.prototype.sign = () => new Vec(Math.sign(this.x), Math.sign(this.y));
	Vec.prototype.floor = () => new Vec(Math.floor(this.x), Math.floor(this.y));
	Vec.prototype.ceil = () => new Vec(Math.ceil(this.x), Math.ceil(this.y));
	Vec.prototype.round = () => new Vec(Math.round(this.x), Math.round(this.y));
	Vec.prototype.abs = () => new Vec(Math.abs(this.x), Math.abs(this.y));
	Vec.prototype.min = (other) => new Vec(Math.min(this.x, other.x), Math.min(this.y, other.y));
	Vec.prototype.max = (other) => new Vec(Math.max(this.x, other.x), Math.max(this.y, other.y));
	Vec.prototype.clamp = (min, max) =>
		new Vec(Math.max(min.x, Math.min(this.x, max.x)), Math.max(min.y, Math.min(this.y, max.y)));
	Vec.prototype.snap = (gridSize) =>
		new Vec(Math.round(this.x / gridSize) * gridSize, Math.round(this.y / gridSize) * gridSize);

	Vec.zero = () => new Vec(0, 0);
	Vec.one = () => new Vec(1, 1);
	Vec.up = () => new Vec(0, -1);
	Vec.down = () => new Vec(0, 1);
	Vec.left = () => new Vec(-1, 0);
	Vec.right = () => new Vec(1, 0);

	Vec.lerp = (a, b, t) => new Vec(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
	Vec.distanceTo = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
	Vec.angleBetween = (a, b) => {
		const dot = a.x * b.x + a.y * b.y;
		const lenProduct = Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y);
		if (lenProduct === 0) return 0;
		let angle = Math.acos(dot / lenProduct);
		const cross = a.x * b.y - a.y * b.x;
		return cross < 0 ? -angle : angle;
	};
	Vec.projectOnto = (a, b) => {
		const bLenSq = b.x * b.x + b.y * b.y;
		if (bLenSq === 0) return new Vec(0, 0);
		const dotProduct = a.x * b.x + a.y * b.y;
		const scalar = dotProduct / bLenSq;
		return new Vec(b.x * scalar, b.y * scalar);
	};
	Vec.reflect = (a, normal) => {
		const dotProduct = a.x * normal.x + a.y * normal.y;
		return new Vec(a.x - 2 * dotProduct * normal.x, a.y - 2 * dotProduct * normal.y);
	};
	Vec.perpendicular = (a) => new Vec(-a.y, a.x);
	Vec.sign = (a) => new Vec(Math.sign(a.x), Math.sign(a.y));
	Vec.floor = (a) => new Vec(Math.floor(a.x), Math.floor(a.y));
	Vec.ceil = (a) => new Vec(Math.ceil(a.x), Math.ceil(a.y));
	Vec.round = (a) => new Vec(Math.round(a.x), Math.round(a.y));
	Vec.abs = (a) => new Vec(Math.abs(a.x), Math.abs(a.y));
	Vec.min = (a, b) => new Vec(Math.min(a.x, b.x), Math.min(a.y, b.y));
	Vec.max = (a, b) => new Vec(Math.max(a.x, b.x), Math.max(a.y, b.y));
	Vec.clamp = (value, min, max) =>
		new Vec(Math.max(min.x, Math.min(value.x, max.x)), Math.max(min.y, Math.min(value.y, max.y)));
	Vec.snap = (value, gridSize) =>
		new Vec(Math.round(value.x / gridSize) * gridSize, Math.round(value.y / gridSize) * gridSize);

	return Vec;
})();

export default Vec;
