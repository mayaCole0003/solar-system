import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { Orbit } from './orbit';
import * as THREE from 'three';
import ringTexture from './assets/SourceImages/2k_saturn_ring_alpha.png';

const Planet = ({
	texture,
	diameter,
	obliquityToOrbit,
	hasRingSystem,
	distanceFromSun,
	rotationPeriod,
	planetRef,
	showOrbit,
	ringRef,
}) => {
	useEffect(() => {
		planetRef.current.rotation.x = obliquityToOrbit * (Math.PI / 180);
		if (hasRingSystem && ringRef && ringRef.current) {
			console.log(ringRef.current);

			// ringRef.current.normal.x = obliquityToOrbit * (Math.PI / 180);
		}
	}, [ringRef, planetRef, obliquityToOrbit, hasRingSystem]);
	useFrame(({ clock }) => {
		planetRef.current.rotation.y += 0.05 / rotationPeriod;
	});
	const ringMap = useLoader(TextureLoader, ringTexture);
	ringMap.wrapT = THREE.RepeatWrapping;
	ringMap.repeat.set(0.5, 90);
	ringMap.rotation = Math.PI / 4;

	const planetMap = useLoader(TextureLoader, texture);
	return (
		<>
			{showOrbit && <Orbit distanceFromSun={distanceFromSun} />}
			<mesh ref={planetRef} position={[distanceFromSun * 10, 0, 0]}>
				<sphereGeometry args={[diameter / 2]} />
				<meshStandardMaterial map={planetMap} />
				{hasRingSystem && (
					<mesh>
						<ringGeometry
							ref={ringRef}
							args={[
								(diameter / 2) * 1.2,
								(diameter / 2) * 1.5,
								64,
							]}
						/>
						<meshBasicMaterial map={ringMap} side={2} />
					</mesh>
				)}
			</mesh>
		</>
	);
};

export default Planet;
