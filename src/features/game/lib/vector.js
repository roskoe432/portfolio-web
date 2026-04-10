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
	Vec.prototype.clone = () => new Vec(this.x, this.y);
	Vec.prototype.equals = (other) => this.x === other.x && this.y === other.y;
	Vec.prototype.toString = () => `Vec(${this.x}, ${this.y})`;
	Vec.prototype.lerp = (other, t) =>
		new Vec(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t);

	Vec.prototype.distanceTo = (other) =>
		Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);

	Vec.zero = () => new Vec(0, 0);
	Vec.one = () => new Vec(1, 1);
	Vec.up = () => new Vec(0, -1);
	Vec.down = () => new Vec(0, 1);
	Vec.left = () => new Vec(-1, 0);
	Vec.right = () => new Vec(1, 0);

	Vec.lerp = (a, b, t) => new Vec(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
	Vec.distanceTo = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

	return Vec;
})();

export default Vec;
