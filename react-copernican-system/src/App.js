import './Modal.css';
import { Environment } from '@react-three/drei';
import TriviaModal from './TriviaModal';
import StartQuizButton from './StartQuizButton';
import planetsData from './assets/PlanetaryData/planets.json';

// import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Sun from './Sun';
import ManagedPlanet from './ManagedPlanet';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import CameraControls from 'camera-controls';
import SolarCamera from './SolarCamera';

CameraControls.install({ THREE });

function App() {
	const [selectedPlanet, setSelectedPlanet] = useState('Earth');
	const [showQuizModal, setShowQuizModal] = useState(false);
	const [selectedTrivia, setSelectedTrivia] = useState('Earth');
	const [showPopup, setShowPopup] = useState(false);
	const [cameraPerspective, setCameraPerspective] = useState(true);
	const [showOrbit, setShowOrbit] = useState(true);

	const useKeypress = (key, action) => {
		useEffect(() => {
			function onKeyup(e) {
				if (e.key === key) action();
			}
			window.addEventListener('keyup', onKeyup);
			return () => window.removeEventListener('keyup', onKeyup);
		});
	};

	useKeypress('Escape', () => setShowPopup(false), [showPopup]);

	const cameraRef = useRef();

	const TriviaSelector = () => {
		const handleTriviaSelection = (triviaType) => {
			setSelectedTrivia(triviaType);
			setShowPopup(false); // Close the popup after selecting trivia
			startQuiz(); // Start the quiz after selecting trivia
		};

		return (
			<div>
				<button
					className='button-container2'
					onClick={() => setShowPopup(true)}
				>
					Select Trivia
				</button>

				<button
					className='button-Orbit'
					onClick={() => setShowOrbit(!showOrbit)}
				>
					Show Orbit
				</button>

				{/* <button
					className='button-TopView'
					onClick={() => setShowOrbit(!showOrbit)}
				>
					Show Top View
				</button> */}

				<button
					className='button-DiffPersp'
					onClick={() => setCameraPerspective(!cameraPerspective)}
				>
					Change Perspective
				</button>

				{showPopup && (
					<div className='popup-container'>
						{/* <div style={popupStyle}> */}
						<div className='popup-content'>
							<h3 className='popup-heading'>
								Select Trivia Type:
							</h3>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Mercury')}
							>
								Mercury Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Venus')}
							>
								Venus Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Earth')}
							>
								Earth Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Mars')}
							>
								Mars Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Jupiter')}
							>
								Jupiter Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Saturn')}
							>
								Saturn Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Uranus')}
							>
								Uranus Trivia
							</button>
							<button
								className='custom-button'
								onClick={() => handleTriviaSelection('Neptune')}
							>
								Neptune Trivia
							</button>
						</div>
					</div>
				)}
			</div>
		);
	};

	const [clicked, setClicked] = useState(false);
	const vec = new THREE.Vector3();
	const [target, setTarget] = useState(new THREE.Vector3(0, 0, 0)); // Initializes target at the center.
	const props = useSpring({
		position: [target.x, target.y, target.z],
		config: { mass: 1, tension: 100, friction: 10 },
	});

	const startQuiz = () => {
		if (selectedTrivia) {
			setShowQuizModal(true);
		} else {
			alert('Please select a trivia type before starting the quiz.');
		}
	};

	const planet1Ref = useRef();
	const planet2Ref = useRef();
	const planet3Ref = useRef();
	const planet4Ref = useRef();
	const planet5Ref = useRef();
	const planet6Ref = useRef();
	const planet7Ref = useRef();
	const planet8Ref = useRef();

	const planetData = {
		Mercury: {
			Diameter: '4,879 km',
			Gravity: '3.7 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '167 K',
			diaValue: 4879,
			ref: planet1Ref,
		},

		Venus: {
			Diameter: '12,104 km',
			Gravity: '8.9 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '464 K',
			diaValue: 12104,
			ref: planet2Ref,
		},

		Earth: {
			Diameter: '12756 km',
			Gravity: '9.8 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '15 K',
			diaValue: 12756,
			ref: planet3Ref,
		},

		Mars: {
			Diameter: '6,792 km',
			Gravity: '3.7 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '-65 K',
			diaValue: 6792,
			ref: planet4Ref,
		},

		Jupiter: {
			Diameter: '142,984 km',
			Gravity: '23.1 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '-110 K',
			diaValue: 142984,
			ref: planet5Ref,
		},

		Saturn: {
			Diameter: '120,536 km',
			Gravity: '9.0 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '-140 K',
			diaValue: 120536,
			ref: planet6Ref,
		},

		Uranus: {
			Diameter: '51,118 km',
			Gravity: '8.7 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '-195 K',
			diaValue: 51118,
			ref: planet7Ref,
		},
		Neptune: {
			Diameter: '49,528 km',
			Gravity: '11.0 m/s2',
			'Length Of Day': '4222.6 hrs',
			'Orbital Period': '88 days',
			'Orbit Inclination': '7°',
			'Mean Temp': '-200 K',
			diaValue: 49528,
			ref: planet8Ref,
		},
	};

	const handlePlanetClick = (planetName) => {
		// console.log('Selected Planet:', planet);
		// setSelectedPlanet(selectedPlanet === planet ? null : planet);
		// console.log('Selected Planet:', selectedPlanet);
		console.log('Selected Planet:', planetName);
		const planet = planetData[planetName];
		if (planet && planet.ref && selectedPlanet !== planetName) {
			setSelectedPlanet(planetName);
			const targetPosition = planet.ref;
			console.log('Target Position:', targetPosition.current);
			setTarget(targetPosition.current.position);
			setClicked(true);
		}
	};

	useEffect(() => {
		if (clicked && target) {
			// Ensure there's a target to move towards
			// Move the camera towards the target position
			const camera = cameraRef.current;
			camera.position.lerp(target, 0.1); // Adjust lerp value (0.1) to control the speed

			camera.lookAt(vec.set(target.x, target.y, target.z)); // Ensure the camera faces the target
			camera.updateProjectionMatrix();
		}
	}, [clicked, target, vec]);

	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				backgroundImage: `url(${process.env.PUBLIC_URL}/assets/SourceImages/background/2k_stars_milky_way.jpg)`,
				backgroundSize: 'cover',
			}}
		>
			<div className='button-container'>
				<StartQuizButton onClick={startQuiz} />
				<TriviaModal
					isVisible={showQuizModal}
					closeModal={() => setShowQuizModal(false)}
					triviaType={selectedTrivia}
				/>
			</div>
			Canvas
			<div className='canvas'>
				{/* <div style={{ height: '100vh', width: '100vw' }}> * */}
				<Canvas>
					<ambientLight intensity={1} />
					{/* <Environment
						files={
							'./assets/SourceImages/background/2k_stars_milky_way.jpg'
						}
						background={true}
					/> */}

					{/* <div class='background'></div> */}

					<SolarCamera
						position={props.position}
						cameraRef={cameraRef}
						targetRef={planetData[selectedPlanet].ref}
						diameter={planetData[selectedPlanet].diaValue}
						topPerspective={cameraPerspective}
					/>

					<pointLight
						color='#f1f1f1'
						intensity={200000}
						position={[-20, 0, 0]}
					/>
					<Sun />
					<ManagedPlanet
						index={0}
						planetRef={planet1Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={1}
						planetRef={planet2Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={2}
						planetRef={planet3Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={3}
						planetRef={planet4Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={4}
						planetRef={planet5Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={5}
						planetRef={planet6Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={6}
						planetRef={planet7Ref}
						showOrbit={showOrbit}
					/>
					<ManagedPlanet
						index={7}
						planetRef={planet8Ref}
						showOrbit={showOrbit}
					/>
					{/* <Marker xPosition={10} yPosition={20} zPosition={30} />
					<Marker xPosition={-50} yPosition={60} zPosition={-70} /> */}
					<OrbitControls enablePan />
				</Canvas>
				<TriviaSelector />
			</div>
			{/* <StartQuizButton onClick={startQuiz} />
			<TriviaModal
				isVisible={showQuizModal}
				closeModal={() => setShowQuizModal(false)}
			/> */}
			{/* Modal */}
			<div className='container'>
				<div className='modal'>
					<div className='modal-content'>
						<h2>Planetary Data</h2>
						<div className='planet-buttons'>
							{Object.keys(planetData).map((planet) => (
								<div
									// key={planet}
									className='planet-button-wrapper'
								>
									<button
										className='planet-button'
										onClick={() =>
											handlePlanetClick(planet)
										}
									>
										{planet}
									</button>
								</div>
							))}
						</div>
						{selectedPlanet && (
							<div className='planet-dropdown'>
								<ul>
									{Object.entries(
										planetData[selectedPlanet]
									).map(([key, value]) => {
										if (key === 'ref' || key == 'diaValue')
											return null;
										return (
											<li key={key}>
												<strong>{key}:</strong> {value}
											</li>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
