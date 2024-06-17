import React from 'react';
import './Modal.css';

const StartQuizButton = ({ onClick }) => {
	return (
		<div className='button-container'>
			<button onClick={onClick}> </button>
		</div>
	);
};

export default StartQuizButton;
