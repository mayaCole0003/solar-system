import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';

export default function SolarCamera({
	cameraRef,
	targetRef,
	diameter,
	topPerspective,
}) {
	const setThree = useThree(({ set }) => set);
	const size = useThree(({ size }) => size);
	const aspectRatio = size.width / size.height;
	const [{ position }, api] = useSpring(() => ({
		position: cameraRef.current ? cameraRef.current.position : [0, 0, 0],
		config: { tension: 10, friction: 40 },
	}));

	useEffect(() => {
		if (targetRef && targetRef.current && cameraRef.current) {
			setThree({ camera: cameraRef.current });
		}
		if (targetRef.current) {
			const target = new THREE.Vector3();
			targetRef.current.getWorldPosition(target);
			api.start({ targetPosition: [target.x, target.y, target.z] });
		}
	}, [targetRef, api, topPerspective, cameraRef, setThree]);

	useEffect(() => {
		if (cameraRef.current) {
			cameraRef.current.aspect = aspectRatio;
			cameraRef.current.updateProjectionMatrix();
		}
	}, [aspectRatio, cameraRef]);

	useFrame(() => {
		if (targetRef && targetRef.current && cameraRef.current) {
			const targetPosition = new THREE.Vector3();
			targetRef.current.getWorldPosition(targetPosition);

			const offset = new THREE.Vector3(
				topPerspective ? diameter / 100 : 0,
				topPerspective ? diameter / 100 : 0,

				diameter / 1000 + 100
			); // adjust this to change the camera's distance from the target
			// cameraRef.current.position.copy(targetPosition.add(offset));
			const newPosition = targetPosition.clone().add(offset);

			api.start({
				position: [newPosition.x, newPosition.y, newPosition.z],
			});

			api.start({
				position: [newPosition.x, newPosition.y, newPosition.z],
			});
			cameraRef.current.lookAt(targetPosition);
		}
	});

	return (
		<a.perspectiveCamera
			makeDefault
			manual
			aspect={16 / 9}
			position={position}
			far={1000000}
			ref={cameraRef}
		/>
	);
}
