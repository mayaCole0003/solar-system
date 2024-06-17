class Planet extends CelestialObject {
	constructor(data, threeSun) {
		super(data.diameter, data.mass, data.gravity, data.density);

		this._id = data.id || null;
		this._name = data.name || null;
		this._rotationPeriod = data.rotationPeriod || null;
		this._lengthOfDay = data.lengthOfDay || null;
		this._distanceFromSun = data.distanceFromSun || null;
		this._orbitalPeriod = data.orbitalPeriod || null;
		this._orbitalVelocity = data.orbitalVelocity || null;
		this._orbitalInclination = data.orbitalInclination || null; // to the ecliptic plane
		this._axialTilt = data.axialTilt || null;
		this._orbitPositionOffset = data.orbitPositionOffset;
		this._orbitHighlightColor = data.orbitHighlightColor || '#2d2d2d';
		this._textureLoader = new THREE.TextureLoader();
		this._threeDiameter = this.createThreeDiameter();
		this._threeRadius = this.createThreeRadius();
		this._surface = this.createSurface(
			data._3d.textures.base,
			data._3d.textures.topo,
			data._3d.textures.specular
		);
		this._atmosphere = this.createAtmosphere(data._3d.textures.clouds);
		this._threeObject = this.createGeometry(
			this._surface,
			this._atmosphere
		);
		this._threeDistanceFromSun = this.createThreeDistanceFromSun();
		this._threeSun = threeSun || null;
		this._theta = 0;
		this._orbitCentroid = this.createOrbitCentroid();
		this._highlight = this.createHighlight();

		this._threeObject.add(this._threeDiameter);

		if (data.rings) {
			this.createRingGeometry(data);
		}

		this.buildFullObject3D();
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get rotationPeriod() {
		return this._rotationPeriod;
	}

	get distanceFromSun() {
		return this._distanceFromSun;
	}

	get orbitalPeriod() {
		return this._orbitalPeriod;
	}

	get orbitalVelocity() {
		return this._orbitalVelocity;
	}

	get orbitalInclination() {
		return this._orbitalInclination;
	}

	get axialTilt() {
		return this._axialTilt;
	}

	get meanTemperature() {
		return this._meanTemperature;
	}

	get moons() {
		return this._moons;
	}

	get orbitPositionOffset() {
		return this._orbitPositionOffset;
	}

	get theta() {
		return this._theta;
	}

	set theta(theta) {
		this._theta = theta;
	}

	get highlight() {
		return this._highlight;
	}

	get threeDiameter() {
		return this._threeDiameter;
	}

	get threeRadius() {
		return this._threeRadius;
	}

	get threeObject() {
		return this._threeObject;
	}

	get threeSun() {
		return this._threeSun;
	}

	get threeDistanceFromSun() {
		return this._threeDistanceFromSun;
	}

	get orbitCentroid() {
		return this._orbitCentroid;
	}

	get orbitLine() {
		return this._orbitLine;
	}

	get orbitHighlightColor() {
		return this._orbitHighlightColor;
	}

	set highlight(amplitude) {
		this._highlight = this.createHighlight(amplitude);
	}
}
