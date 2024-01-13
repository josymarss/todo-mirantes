import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";

import { ListComponent } from "../List/ListConponent";
import { EmptyList } from "../Empty/EmptyList";
import {
  addTodo,
  getTodosInStorage,
  removeTodo,
  updateTodo,
} from "../../src/storage/todos/todos";

export function Home() {
  const [events, setEvent] = useState<string[]>([]);
  const [finished, setFinished] = useState<string[]>([]);

  const [eventName, setEventName] = useState("");
  const [aux, setAux] = useState("");
  const [edited, setEdited] = useState(false);

  function setHandleEvent(value: string) {
    setEventName(value);
  }
  async function handleAddEvent() {
    if (events.includes(eventName) && !edited) {
      return Alert.alert("Este evento já existe");
    }
    if (eventName.length ==0) {
      return Alert.alert("Insere o nome de um evento");
    }
    if (edited) {
      const result: boolean = await updateTodo(aux, eventName);
      result && Alert.alert("Produto actualizado com sucesso!");

      setEvent(await getTodosInStorage());
      setEventName("");
      setEdited(false);
    } else {
      await addTodo(eventName);
      setEvent(await getTodosInStorage());
      setEventName("");
      // setEvent((prev) => [...prev, eventName]);
    }
  }

  // Does not use in storage
  function handleFinished(item: string) {
    if (finished.includes(item)) {
      return setFinished(finished.filter((event) => event != item));
    }
    setFinished((prev) => [...prev, item]);
  }

  function handleUpdate(item: string) {
    setEventName(item);
    setAux(item);
  }

  async function handleRemove(event: string) {
    Alert.alert("Apagar", "Tem cerrteza que deseja apagar?", [
      {
        text: "Sim",
        onPress: async () => {
          await removeTodo(event);
          setEvent(await getTodosInStorage());
          Alert.alert("Evento apagado com sucesso!");
          if (finished.includes(event)) {
            setFinished(finished.filter((item) => item != event));
          }
        },
      },
      {
        text: "Não",
        onPress: () => "",
      },
    ]);
  }

  useEffect(() => {
    async function getData() {
      setEvent(await getTodosInStorage());
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/Logo.png")} resizeMode="contain" />
      </View>
      <View style={styles.containerList}>
        <View style={styles.addContainer}>
          <TextInput
            value={eventName}
            onChangeText={setHandleEvent}
            placeholderTextColor="#808080"
            placeholder="Adicione uma nova tarefa"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button}>
            <Button onPress={() => handleAddEvent()} title="+" color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.status}>
          <View style={styles.detailsStatus}>
            <Text style={styles.textOne}>Criadas</Text>
            <View style={styles.detail}>
              <Text>{events && events.length}</Text>
            </View>
          </View>
          <View style={styles.detailsStatus}>
            <Text style={styles.textTwo}>Concluidos</Text>
            <View style={styles.detail}>
              <Text>{finished && finished.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          <FlatList
            data={events}
            renderItem={({ item }) => (
              <ListComponent
                done={finished}
                eventName={item}
                onRemove={() => handleRemove(item)}
                onFinish={() => handleFinished(item)}
                onUpdate={() => handleUpdate(item)}
                onEdited={() => setEdited(true)}
              />
            )}
            ListEmptyComponent={EmptyList}
          />
        </View>
      </View>
    </View>
  );
}
