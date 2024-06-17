import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import planetData from './assets/PlanetaryData/planets.json';
import { createPlanets, initPlanets } from './planets';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const PlanetDataModal = ({ planet }) => {
// 	const data = planetData[planet];

// 	return (
// 		<View style={styles.modalContainer}>
// 			<View style={styles.modalContent}>
// 				<Text style={styles.modalTitle}>{planet}</Text>
// 				<Text>Diameter: {data.diameter}</Text>
// 				<Text>Semi-major Axis: {data.semiMajorAxis}</Text>
// 				<Text>Length Of Day: {data.lengthOfDay}</Text>
// 				<Text>Orbital Period: {data.orbitalPeriod}</Text>
// 				<Text>Orbit Inclination: {data.orbitInclination}</Text>
// 				<Text>Surface Temp: {data.surfaceTemp}</Text>
// 			</View>
// 		</View>
// 	);
// };

function SolarSystemGame() {
	useEffect(() => {
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
		// renderer.render(scene, camera);
		// createPlanets(
		// 	scene,
		// 	2,
		// 	'./assets/SourceImages/2k_jupiter.jpg',
		// 	5,
		// 	false
		// );
		// Read JSON from file and call scene.add() for each object
		// initPlanets(scene);

		const modalGeometry = new THREE.PlaneGeometry(400, 200);
		const modalMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
		const modalBackground = new THREE.Mesh(modalGeometry, modalMaterial);
		modalBackground.position.set(0, 0, -500);
		scene.add(modalBackground);

		// Create text for modal
		const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		const textLoader = new THREE.FontLoader();
		textLoader.load('/path/to/font.json', (font) => {
			const textGeometry = new THREE.TextGeometry(
				'Your Modal Text Here',
				{
					font: font,
					size: 10,
					height: 0,
				}
			);
			const modalText = new THREE.Mesh(textGeometry, textMaterial);
			modalText.position.set(-100, 50, -499);
			scene.add(modalText);
		});

		return () => {
			console.log('Component will unmount');
		};
	}, []);

	// return (
	// 	<View style={styles.container}>
	// 		<View style={styles.buttonContainer}>
	// 			{Object.keys(planetData).map((planet) => (
	// 				<TouchableOpacity key={planet}>
	// 					<Text style={styles.button}>{planet}</Text>
	// 				</TouchableOpacity>
	// 			))}
	// 		</View>
	// 		<PlanetDataModal planet={'Mercury'} />
	// 		<PlanetDataModal planet={'Venus'} />
	// 		<PlanetDataModal planet={'Earth'} />
	// 		<PlanetDataModal planet={'Mars'} />
	// 		<PlanetDataModal planet={'Jupiter'} />
	// 		<PlanetDataModal planet={'Saturn'} />
	// 		<PlanetDataModal planet={'Uranus'} />
	// 		<PlanetDataModal planet={'Neptune'} />
	// 		<PlanetDataModal planet={'Pluto'} />
	// 	</View>
	// );
	// return <div>Solar System Game</div>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		width: '80%',
		marginTop: 20,
	},
	button: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 18,
		padding: 10,
		marginBottom: 10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

export default SolarSystemGame;
