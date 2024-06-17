import React from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import textureImg from './assets/SourceImages/2k_sun.jpg';
import { TextureLoader } from 'three';
import TWEEN from '@tweenjs/tween.js';

function Sun() {
	const sunMeshRef = React.useRef();

	useFrame(({ clock }) => {
		sunMeshRef.current.rotation.y += 0.005;
		TWEEN.update();
	});
	const sunMap = useLoader(TextureLoader, textureImg);
	return (
		<Sphere ref={sunMeshRef} args={[10]} position={[-20, 0, 0]}>
			<meshStandardMaterial
				attach='material'
				color='white'
				emissiveMap={sunMap}
			/>
			<meshStandardMaterial map={sunMap} emissiveIntensity={100} />
		</Sphere>
	);
}

export default Sun;
