import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import {
  TapGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

type Props = {
  onRemove: () => void;
  onFinish: () => void;
  onUpdate: () => void;
  onEdited: () => void;
  eventName: string;
  eventDescription: string;
  done: boolean;
};

export function ListComponent({
  onRemove,
  onFinish,
  eventName,
  eventDescription,
  done,
  onUpdate,
  onEdited,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onFinish} style={styles.between}>
        <View style={styles.space}>
          <View style={styles.wrapDescriptions}>
            <View style={done ? styles.detail2 : styles.detail}>
              {done ? (
                <Ionicons name="checkmark" size={14} color="white" />
              ) : (
                ""
              )}
            </View>
            <Text style={done ? styles.trough : styles.event}>{eventName}</Text>
          </View>
          <Text style={styles.description}>{eventDescription}</Text>
        </View>
      </TouchableOpacity>
      <Ionicons
        name="ios-pencil-sharp"
        size={24}
        color="#808080"
        onPress={() => {
          onUpdate();
          onEdited();
        }}
      />
      <Ionicons name="trash" size={24} color="#808080" onPress={onRemove} />
    </View>
  );
}
