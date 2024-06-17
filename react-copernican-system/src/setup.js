import * as THREE from 'three';
import { initPlanets } from './planets';

export function setup() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		2000
	);

	const renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById('gameCanvas'),
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener(
		'resize',
		() => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		},
		false
	);
	renderer.render(this.scene, this.camera);

	// Read JSON from file and call scene.add() for each object
	initPlanets(scene);

	return;
}
