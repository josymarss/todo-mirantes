import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Home } from './components/Home/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent style='light'/>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
