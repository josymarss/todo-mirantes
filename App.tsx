import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "app/store";

import { Home } from "components/Home/Home";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar translucent style="light" />
        <Home />
      </View>
    </Provider>
  );
}
