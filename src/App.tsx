import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Login from './pages/Auth/Login';
import Home from './pages/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
