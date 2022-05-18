import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';

export default function App() {
	const [dollar, updateDollar] = useState('4');
	const [naira, updateNaira] = useState('');
	const [exchangeRate, setExchangeRate] = useState(415.25);
	const [isLoading, setIsLoading] = useState(false);

	const DOLLAR_IN_NUMBER = parseInt(dollar);
	// const URL =
	// 'https://api.currencyapi.com/v3/latest?apikey=dcvYw1hZFSNWRFY1uGRdrjmoBUeKMLLOWLd0Uc4m&currencies=NGN';

	// async function getExchangeRate() {
	// 	try {
	// 		setIsLoading(true);
	// 		let response = await fetch(URL);
	// 		let result = await response.json();
	// 		if (result != undefined) {
	// 			setIsLoading(false);
	// 			setExchangeRate(result.data.NGN.value);
	// 		}
	// 	} catch (error) {}
	// };

	// useEffect(() => {
	// 	getExchangeRate();
	// }, []);

	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				backgroundColor='#00008f'
				barStyle={'light-content'}
				showHideTransition={'fade'}
				hidden={false}
			/>
			<Text>Current exchange rate: {exchangeRate}</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => {
					updateDollar(text);
					var dollarToNairaValue =
						Math.round(parseInt(text) * exchangeRate * 100) / 100 || 0;
					updateNaira(dollarToNairaValue.toString());
				}}
				value={dollar}
				placeholder='$'
				keyboardType='numeric'
				editable={!isLoading}
			/>
			<TextInput
				style={styles.input}
				onChangeText={(text) => {
					updateNaira(text);
					var nairaToDollarValue =
						Math.round(parseInt(text) * exchangeRate * 100) / 100 || 0;
					updateDollar(nairaToDollarValue.toString());
				}}
				value={naira}
				placeholder='₦'
				keyboardType='numeric'
				editable={!isLoading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
