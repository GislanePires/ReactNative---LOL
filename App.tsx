import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from "./src/Routes/index";
import CarregaFonte from "./src/utils/CarregaFonte";
import AuthProvider from "./src/contexts/auth";



const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const handleFontsLoaded = () => {
		setFontsLoaded(true);
	};

	CarregaFonte(handleFontsLoaded);

	if (!fontsLoaded) {
		return null;
	}
	return (
		
				<Routes />
		
	)
};

export default App;