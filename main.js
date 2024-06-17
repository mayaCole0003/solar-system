import * as THREE from 'three';
import * as dat from 'dat.gui';

// Declare variables for the main components: scene, camera, renderer, and the Earth mesh
let scene, camera, renderer, earth;

// Initialize the scene
function init() {
	// Create the scene
	scene = new THREE.Scene();

	// Create and set up the camera
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 0, 20); // Position the camera

	// Create the WebGL renderer and attach it to the document
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement); // Append the renderer element to your HTML document
	const light = new THREE.AmbientLight(0xfffffff); // soft white light
	scene.add(light);
	// Create the Earth object and add it to the scene
	earth = createEarth();

	scene.add(earth);

	// Handle window resize events
	window.addEventListener('resize', onWindowResize, false);

	scene.background = new THREE.TextureLoader().load(
		'assets/SourceImages/background/2k_stars_milky_way.jpg'
	);
	// Start the animation loop
	animate();
}

// Function to create the Earth mesh
function createEarth() {
	// Define the geometry (shape) of the Earth - a sphere in this case
	const geometry = new THREE.SphereGeometry(12, 32, 32); // Sphere with radius 1 and 32 segments
	// Define the material and its appearance (basic material with a blue color in this example)
	const material = new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load(
			'assets/SourceImages/2k_earth_daymap.jpg'
		),
		bumpMap: new THREE.TextureLoader().load(
			'assets/SourceImages/bumpMap/2k_earth_normal_map.tif'
		),
		// bumpScale: 0.03x,
	});
	// Create the mesh by combining the geometry and the material
	const sphere = new THREE.Mesh(geometry, material);
	return sphere; // Return the Earth mesh
}

// Animation loop function to continuously render the scene
function animate() {
	requestAnimationFrame(animate); // Request the next frame

	// Rotation logic (rotate the Earth mesh)
	earth.rotation.y += 0.005;

	// Render the scene from the perspective of the camera
	renderer.render(scene, camera);
}

// Handle window resize events
function onWindowResize() {
	// Update the camera's aspect ratio and the renderer size
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the scene when the script loads
init();
const gui = new dat.GUI();
const earthFolder = gui.addFolder('Earth');
earthFolder.add(earth.rotation, 'x', 0, Math.PI * 2);
earthFolder.add(earth.rotation, 'y', 0, Math.PI * 2);
earthFolder.add(earth.rotation, 'z', 0, Math.PI * 2);
earthFolder.add(earth.scale, 'x', 0, 5);
earthFolder.add(earth.scale, 'y', 0, 5);
earthFolder.add(earth.scale, 'z', 0, 5);
earthFolder.open();
