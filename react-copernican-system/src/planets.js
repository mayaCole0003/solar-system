import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import planetsData from './assets/PlanetaryData/planets.json'; // Import planetsData

const textureLoader = new THREE.TextureLoader();

let celestialBodies = [];
export function createPlanets(inputScene, size, texture, position, ring) {
	const geo = new THREE.SphereGeometry(size, 30, 30);
	const mat = new THREE.MeshStandardMaterial({
		map: textureLoader.load(texture),
		emissiveIntensity: 1,
	});

	const mesh = new THREE.Mesh(geo, mat);
	const obj = new THREE.Object3D();
	obj.add(mesh);

	if (ring) {
		const ringGeo = new THREE.RingGeometry(
			ring.innerRadius,
			ring.outerRadius,
			32
		);
		const ringMat = new THREE.MeshBasicMaterial({
			map: textureLoader.load(ring.texture),
			side: THREE.DoubleSide,
		});
		const ringMesh = new THREE.Mesh(ringGeo, ringMat);
		obj.add(ringMesh);
		ringMesh.position.x = position;
		ringMesh.rotation.x = -0.5 * Math.PI;
	}
	inputScene.add(obj);
	mesh.position.x = position;
	return { mesh, obj };
}

export function initPlanets(inputScene) {
	planetsData.forEach((planet) => {
		const size = planet.diameter / 2;
		const texturePath = `/react-copernican-system/assets/SourceImages/2k_/${planet.name.toLowerCase()}.jpg`;
		const position = planet.distanceFromSun; // This might need to be scaled or adjusted depending on our inputScene's scale
		const ring = planet.hasRingSystem
			? {
					innerRadius: size * 1.2,
					outerRadius: size * 1.5,
					texture: `/react-copernican-system/assets/SourceImages/2k_/${planet.name.toLowerCase()}_ring.jpg`,
			  }
			: null; // Adjust as needed

		createPlanets(inputScene, size, texturePath, position, ring);
		celestialBodies.push({
			name: planet.name,
			mesh: planet.mesh,
			selfRotateSpeed: planet.rotationPeriod,
			orbitRotateSpeed: planet.orbitalVelocity,
		});
	});
}
export default function Marker({ xPosition, yPosition, zPosition }) {
	const [clicked, setClicked] = useState(false);
	const markerRef = useRef();
	const { camera } = useThree();
	const vec = new THREE.Vector3();

	useFrame(() => {
		if (clicked) {
			camera.lookAt(vec.set(xPosition, yPosition, zPosition)); // Ensure the camera faces the target
			camera.position.lerp(
				vec.set(xPosition, yPosition, zPosition),
				0.01
			); // Adjust lerp value (0.1) to control the speed
			camera.updateProjectionMatrix();
		}
	});

	return (
		<mesh
			ref={markerRef}
			position={[xPosition, yPosition, zPosition]}
			onClick={() => setClicked(!clicked)} // Toggle click state
		></mesh>
	);
}

// function animate(inputScene) {
// 	requestAnimationFrame(animate); // Ensure the animation loop continues

// 	// Iterate through each celestial body and apply rotations
// 	celestialBodies.forEach((body) => {
// 		// Self-rotation: Adjust the speed based on the planet's rotation period
// 		if (body.mesh && body.selfRotateSpeed) {
// 			// Convert rotation speed to radians for Three.js (if not already done when setting the speed)
// 			body.mesh.rotateY((body.selfRotateSpeed * Math.PI) / 180);
// 		}

// 		// Around-sun-rotation: Adjust the speed based on the planet's orbital period
// 		if (body.obj && body.orbitRotateSpeed) {
// 			// Convert orbital speed to radians for Three.js (if not already done when setting the speed)
// 			body.obj.rotateY((body.orbitRotateSpeed * Math.PI) / 180);
// 		}
// 	});

// 	// Update the scene and camera
// 	renderer.render(InputScene, camera);
// }
