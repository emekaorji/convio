import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
	const [dollar, updateDollar] = useState('1');
	const [naira, updateNaira] = useState('');
	const [exchangeRate, setExchangeRate] = useState(415.25);
	const [isLoading, setIsLoading] = useState(false);

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

	useEffect(() => {
		// getExchangeRate();
		handleDollarToNairaUpdates();
		handleNairaToDollarUpdates();
	}, []);
	function handleDollarToNairaUpdates(text) {
		updateDollar(text);
		var dollarToNairaValue =
			Math.round(parseInt(text) * exchangeRate * 100) / 100 || 0;
		updateNaira(dollarToNairaValue.toString());
	}
	function handleNairaToDollarUpdates(text) {
		updateNaira(text);
		var nairaToDollarValue =
			Math.round(parseInt(text) * exchangeRate * 100) / 100 || 0;
		updateDollar(nairaToDollarValue.toString());
	}

	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				backgroundColor='#00008f'
				barStyle={'light-content'}
				showHideTransition={'fade'}
				hidden={false}
			/>
			<View style={styles.exchangeRateContainer}>
				<Text style={styles.exchangeRateText}>$1</Text>
				<Icon
					style={styles.arrowRight}
					name='arrow-right'
					size={20}
					color='#00008f'
				/>
				<Text style={styles.exchangeRateText}>₦{exchangeRate}</Text>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.inputLabelContainer}>
					<Text style={styles.inputLabel}>$</Text>
				</View>
				<TextInput
					style={styles.input}
					onChangeText={handleDollarToNairaUpdates}
					value={dollar}
					placeholder='$'
					keyboardType='numeric'
					editable={!isLoading}
				/>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.inputLabelContainer}>
					<Text style={styles.inputLabel}>₦</Text>
				</View>
				<TextInput
					style={styles.input}
					onChangeText={handleNairaToDollarUpdates}
					value={naira}
					placeholder='₦'
					keyboardType='numeric'
					editable={!isLoading}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	exchangeRateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	exchangeRateText: {
		fontSize: 32,
	},
	arrowRight: {
		marginLeft: 10,
		marginRight: 10,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		borderWidth: 0,
		borderRadius: 30,
		margin: 12,
		marginLeft: 32,
		marginRight: 32,
		overflow: 'hidden',
	},
	inputLabelContainer: {
		width: 84,
		height: 84,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#00006f',
	},
	inputLabel: {
		textAlign: 'center',
		fontSize: 50,
		color: '#fff',
		// fontFamily: 'Merriweather-Bold',
	},
	input: {
		width: 84,
		height: 84,
		fontSize: 32,
		flex: 1,
		borderWidth: 1,
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
		padding: 10,
	},
});
