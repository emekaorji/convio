import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	StatusBar,
	Linking,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ExternalLink = ({ url, children, style }) => {
	const onPress = () =>
		Linking.canOpenURL(url).then(() => {
			Linking.openURL(url);
		});

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[style]}>{children}</Text>
		</TouchableOpacity>
	);
};

export default function App() {
	const [dollar, updateDollar] = useState('1');
	const [naira, updateNaira] = useState('');
	const [exchangeRate, setExchangeRate] = useState(415.25);
	const [isLoading, setIsLoading] = useState(true);

	const URL =
		'https://api.currencyapi.com/v3/latest?apikey=dcvYw1hZFSNWRFY1uGRdrjmoBUeKMLLOWLd0Uc4m&currencies=NGN';

	async function getExchangeRate() {
		try {
			setIsLoading(true);
			let response = await fetch(URL);
			let result = await response.json();
			if (result != undefined) {
				setExchangeRate(Math.round(result.data.NGN.value * 100) / 100);
				setIsLoading(false);
			}
		} catch (error) {}
	}

	useEffect(() => {
		getExchangeRate();
	}, []);
	useEffect(() => {
		handleNairaToDollarUpdates(exchangeRate.toString());
	}, [exchangeRate]);

	function handleDollarToNairaUpdates(text) {
		updateDollar(text);
		var dollarToNairaValue =
			Math.round(parseFloat(text) * exchangeRate * 100) / 100 || 0;
		updateNaira(dollarToNairaValue.toString());
	}
	function handleNairaToDollarUpdates(text) {
		updateNaira(text);
		var nairaToDollarValue =
			Math.round((parseFloat(text) / exchangeRate) * 100) / 100 || 0;
		updateDollar(nairaToDollarValue.toString());
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
		},
		textContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		exchangeRateText: {
			fontSize: 16,
		},
		arrowRight: {
			marginLeft: 6,
			marginRight: 6,
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
			backgroundColor: isLoading ? '#00006f33' : '#00006f',
		},
		inputLabel: {
			textAlign: 'center',
			fontSize: 50,
			color: '#fff',
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
		attribution: {
			position: 'absolute',
			bottom: 50,
		},
		link: {
			textDecorationLine: 'underline',
			textDecorationColor: '#00008f',
		},
	});

	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				backgroundColor='#00008f'
				barStyle={'light-content'}
				showHideTransition={'fade'}
				hidden={false}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.exchangeRateText}>Current rate: $1</Text>
				<Icon
					style={styles.arrowRight}
					name='arrow-right'
					size={16}
					color='#00008f'
				/>
				<Text style={styles.exchangeRateText}>
					₦{isLoading ? '...' : exchangeRate}
				</Text>
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
			<View style={{ ...styles.textContainer, ...styles.attribution }}>
				<Text>Built with </Text>
				<ExternalLink style={styles.link} url='https://expo.dev/'>
					expo-cli
				</ExternalLink>
				<Text> and </Text>
				<ExternalLink style={styles.link} url='https://currencyapi.com/'>
					api.currencyapi.com
				</ExternalLink>
			</View>
		</View>
	);
}


