import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/index';
import PlayerSearch from '../../screens/SearchPlayer/index';
import HomeIcon from '../../assets/LoginIcons/riotLogo.png';
import InicialIcon2 from '../../assets/LoginIcons/classificacao.png';
import StackLogin from '../Stack/stack.routes'

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
	PlayerSearch: {};
	Home: {};

}

export function BottomTabRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#000', paddingBottom: 2 },
				tabBarActiveTintColor: '#fff'
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={HomeIcon}
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="Home"
				component={Home}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={InicialIcon2}
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="PlayerSearch"
				component={PlayerSearch}
			/>
		</Tab.Navigator>
	);
}