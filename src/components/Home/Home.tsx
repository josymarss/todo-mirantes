import { useEffect, useState, useCallback } from "react";
import * as Network from "expo-network";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";

import {
  addToDatabase,
  removeOnDatabase,
  updateOnDatabase,
} from "firebaseconfig/operations";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { fireStore } from "firebaseconfig/config";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "app/store";

import { styles } from "./styles";
import { ListComponent } from "components/List/ListConponent";
import { EmptyList } from "components/Empty/EmptyList";
import { addTodoOnStorage, getTodoOnStorage } from "storage/todos/todos";
import { dataProps } from "types/types";
import { addTodo, updateTodo ,deleteTodo } from "app/reducers/todoslice";

export function Home() {
  // redux
  const reduxTodos = useSelector((state: RootType) => state.todo.value);
  // console.log("Redux done", reduxTodos);
  const dispatch = useDispatch();

  const [events, setEvent] = useState<any[]>([]);
  const [finished, setFinished] = useState<string[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventDoc, setEventDoc] = useState<dataProps | null>();
  const [edited, setEdited] = useState(false);
  const [complete, setCompleted]= useState<number>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  function setHandleEvent(value: string) {
    setEventName(value);
  }

  async function handleAddEvent() {
    const task = events.filter((item) => item.title == eventName);

    if (task.length != 0 && !edited) {
      return Alert.alert("Esta tarefa já existe, tente edita-la!");
    }
    if (eventName.length == 0) {
      return Alert.alert("Insere o nome de uma tarefa!");
    }
    if (edited) {
      try {
        const ref = doc(fireStore, `todos/${eventDoc?.id}`);
        await updateOnDatabase(ref, {
          title: eventName,
        });
      } catch (error) {
        throw new Error(`This error occured ${error}`);
      }

      Alert.alert("Tarefa actualizada com sucesso!");
      // update data on ui
      await getEventFromDataBase();
      setRefreshing(false);
      // update data on storage
      await addTodoOnStorage(events);

      setEventName("");
      setEdited(false);
      setEventDoc(null);
    } else {
      // Add to database
      await addToDatabase({
        title: eventName,
        description:
          "Event inserted, and this is the description for that jus for testing",
        done: false,
      });

      Alert.alert("Tarefa criada com sucesso!");

      // update data on ui
      await getEventFromDataBase();
      setRefreshing(false);
      // update data on storage
      await addTodoOnStorage(events);

      setEventName("");
    }
  }
  // Update state's task
  async function handleFinished(item: dataProps) {
    const ref = doc(fireStore, `todos/${item?.id}`);

    try {
      await updateOnDatabase(ref, {
        ...item,
        done: !item.done,
      });
    } catch (error) {
      throw new Error(`This error occured: ${error}`);
    }

    Alert.alert("Estado da tarefa, actualizado com sucesso!");
    
    await getEventFromDataBase();
    // update data on storage
    await addTodoOnStorage(events);

    const complete = events && events.filter((event) => event.done == true);
    setCompleted(complete?.length);
    console.log(complete?.length);
  }

  function handleUpdate(item: dataProps) {
    setEventName(item?.title!);
  }

  async function handleRemove(item: any) {
    Alert.alert(
      "Apagar",
      `Tem certeza que deseja apagar a tarefa? ${item.title}`,
      [
        {
          text: "Sim",
          onPress: async () => {
            const ref = doc(fireStore, `todos/${item?.id}`);
            await removeOnDatabase(ref);
            // // update data on ui
            await getEventFromDataBase();
            setRefreshing(false);
            // // update data on storage
            await addTodoOnStorage(events);
            Alert.alert("Tarefa apagada com sucesso!");
            const complete = events && events.filter((event) => event.done == true);
            setCompleted(complete?.length);
          },
        },
        {
          text: "Não",
          onPress: () => "",
        },
      ]
    );
  }

  async function getEventFromDataBase() {
    const todoRef = collection(fireStore, "todos");
    const todos: any[] = [];

    const subscriber = onSnapshot(todoRef, {
      next: (snapShot) => {
        console.log('Snapshot geted', snapShot.docs.every);
        snapShot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEvent(todos);
      },
    });

    setRefreshing(true);
    return () => subscriber();
  }

  useEffect(() => {
    async function getData() {
      // Check the internet connection
      const network = await Network.getNetworkStateAsync();
      if (network.isConnected) return await getEventFromDataBase();
      // Local storage setion
      setEvent(await getTodoOnStorage());
    }
    getData();
    const complete = events && events.filter((event) => event.done == true);
    setCompleted(complete?.length);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("assets/Logo.png")} resizeMode="contain" />
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
              <Text>{complete && complete}</Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          <FlatList
            // extraData={events}
            data={events?events:[]}
            refreshing={refreshing}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListComponent
                done={item.done}
                eventName={item.title}
                eventDescription={item.description}
                onRemove={() => handleRemove(item)}
                onFinish={() => {
                  handleFinished(item);
                  setEventDoc(item);
                }}
                onUpdate={() => handleUpdate(item)}
                onEdited={() => {
                  setEdited(true);
                  setEventDoc(item);
                }}
              />
            )}
            ListEmptyComponent={EmptyList}
          />
        </View>
      </View>
    </View>
  );
}
