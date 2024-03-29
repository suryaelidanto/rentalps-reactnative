import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/index';

export default function App() {
  return (
    <>
      <StatusBar translucent={false} />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
