import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

export function EmptyList() {
  return (
    <View style={styles.container}>
      <Ionicons name="clipboard" color="#333333" size={80} />
      <Text style={styles.text}>
        Você ainda não tem tarefas cadastradas Crie tarefas e organize seus
        itens a fazer
      </Text>
    </View>
  );
}
