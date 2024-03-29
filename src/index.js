import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import AddTransactionScreen from './AddTransactionScreen';
import TransactionScreen from './TransactionScreen';
import AboutUsScreen from './AboutUsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function index() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Tambah') {
                        iconName = focused
                            ? 'add-circle'
                            : 'add-circle-outline';
                    } else if (route.name === 'Riwayat') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Tentang') {
                        iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2A9D8F',
                tabBarInactiveTintColor: '#264653',
            })}>
                <Tab.Screen name='Tambah' component={AddTransactionScreen} options={{ headerShown: false }} />
                <Tab.Screen name='Riwayat' component={TransactionScreen} options={{ headerShown: false, unmountOnBlur: true }} />
                <Tab.Screen name='Tentang' component={AboutUsScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
