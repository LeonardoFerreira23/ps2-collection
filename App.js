import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Image: style.resizeMode is deprecated',
]);

export default function App() {
  return <Home />;
}

