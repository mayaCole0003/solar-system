import React, { useRef } from 'react';
import Planet from './Planet';
import planetsData from './assets/PlanetaryData/planets.json';
import earthDaymapImg from './assets/SourceImages/2k_earth_daymap.jpg';
import { kmToLightYears } from './utils';
import jupiterImg from './assets/SourceImages/2k_jupiter.jpg';
import marsImg from './assets/SourceImages/2k_mars.jpg';
import mercuryImg from './assets/SourceImages/2k_mercury.jpg';
import neptuneImg from './assets/SourceImages/2k_neptune.jpg';
import saturnImg from './assets/SourceImages/2k_saturn.jpg';
import uranusImg from './assets/SourceImages/2k_uranus.jpg';
import venusImg from './assets/SourceImages/2k_venus_surface.jpg';
import { useFrame, useLoader } from '@react-three/fiber';
import ringTexture from './assets/SourceImages/2k_saturn_ring_alpha.png';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Circle } from '@react-three/drei';

const ManagedPlanet = ({ index, planetRef, showOrbit }) => {
	const { diameter, obliquityToOrbit, hasRingSystem, distanceFromSun } =
		planetsData[index];
	const planetImage = [
		mercuryImg,
		venusImg,
		earthDaymapImg,
		marsImg,
		jupiterImg,
		saturnImg,
		uranusImg,
		neptuneImg,
	][index];

	const planetParentMeshRef = useRef();
	const ringRef = useRef();

	useFrame(({ clock }) => {
		planetParentMeshRef.current.rotation.y +=
			2 / planetsData[index].orbitalPeriod;
	});

	return (
		<mesh ref={planetParentMeshRef}>
			<Planet
				texture={planetImage}
				diameter={diameter / 1000}
				obliquityToOrbit={obliquityToOrbit}
				hasRingSystem={hasRingSystem}
				distanceFromSun={distanceFromSun / 10}
				rotationPeriod={planetsData[index].rotationPeriod}
				planetRef={planetRef}
				showOrbit={showOrbit}
				ringRef={ringRef}
			></Planet>
		</mesh>
	);
};

export default ManagedPlanet;
