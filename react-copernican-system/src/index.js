import { createRoot } from 'react-dom/client';
import React, { Suspense, useRef, useState } from 'react';
import { Loader } from '@react-three/drei';
import App from './App';

createRoot(document.getElementById('root')).render(
	<Suspense fallback={<Loader />}>
		<App />
	</Suspense>
);
