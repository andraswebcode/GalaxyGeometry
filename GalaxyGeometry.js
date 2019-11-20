THREE.GalaxyGeometry = function(radius, numberOfStars, length, width) {

	THREE.Geometry.call(this);

	this.type = 'GalaxyGeometry';

	this.parameters = {
		radius:radius,
		numberOfStars:numberOfStars,
		length:length,
		width:width
	};

	this.fromBufferGeometry(new THREE.GalaxyBufferGeometry(radius, numberOfStars, length, width));
	this.mergeVertices();

};

THREE.GalaxyGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.GalaxyGeometry.prototype.constructor = THREE.GalaxyGeometry;

THREE.GalaxyBufferGeometry = function(radius, numberOfStars, length, width) {

	THREE.BufferGeometry.call(this);

	this.type = 'GalaxyBufferGeometry';

	this.parameters = {
		radius:radius,
		numberOfStars:numberOfStars,
		length:length,
		width:width
	};

	radius = radius || 1;
	numberOfStars = Math.floor(numberOfStars) || 1000;
	length = length || 10;
	width = width || 0.7;

	var vertices = [];
	var _numberOfStars = numberOfStars / 2;

	for (var i = 0; i < _numberOfStars; i++){

		var _length = (length / _numberOfStars) * i;
		var _radius = (radius / _numberOfStars) * i;
		var _x = i * (1 / (_numberOfStars / 2));
		var _parabola = - Math.pow(_x - 1.1, 2) + 1.1;

		vertices.push(
			_parabola * randSpread() + Math.sin(_length) * _radius,
			_parabola * randSpread(),
			_parabola * randSpread() + Math.cos(_length) * _radius,
			- (_parabola * randSpread() + Math.sin(_length) * _radius),
			- (_parabola * randSpread()),
			- (_parabola * randSpread() + Math.cos(_length) * _radius)
		);

	}

	this.setIndex([]);
	this.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	this.addAttribute('normal', new THREE.Float32BufferAttribute([], 3));
	this.addAttribute('uv', new THREE.Float32BufferAttribute([], 2));

	function randSpread() {
		return (Math.random() * width - (width / 2)) * (Math.random() * width - (width / 2));
	}

};

THREE.GalaxyBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.GalaxyBufferGeometry.prototype.constructor = THREE.GalaxyBufferGeometry;

