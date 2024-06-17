import { useMemo } from 'react';
import * as THREE from 'three';
import { extend, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';

extend({ Line });

export const Orbit = ({ distanceFromSun }) => {
	const { scene } = useThree();
	const points = useMemo(() => {
		const points = [];
		const divisions = 128; // Number of points that make up the circle
		const radius = distanceFromSun * 10;

		for (let i = 0; i <= divisions; i++) {
			const angle = (i / divisions) * Math.PI * 2;
			points.push(
				new THREE.Vector3(
					Math.cos(angle) * radius,
					0,
					Math.sin(angle) * radius
				)
			);
		}

		return points;
	}, [distanceFromSun]);

	return <Line points={points} color='white' lineWidth={0.5} />;
};
