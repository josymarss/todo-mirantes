import AsyncStorage from "@react-native-async-storage/async-storage";
import { TODO_COLLECTION } from "../storage.config";

export async function getTodosInStorage() {
  try {
    const todos: string = (await AsyncStorage.getItem(
      TODO_COLLECTION
    )) as string;
    const parsedTodos: string[] = todos ? JSON.parse(todos) : [];
    return parsedTodos;
  } catch (err) {
    throw new Error("There is any error");
  }
}

export async function addTodo(todo: string) {
  try {
    const storageData: string[] = await getTodosInStorage();
    const data = [todo, ...storageData];
    const parsed: string = JSON.stringify(data);
    await AsyncStorage.setItem(TODO_COLLECTION, parsed);
  } catch (err) {
    throw new Error("There is any error");
  }
}

export async function updateTodo(old: string, newTodo: string) {
  try {
    const storageData: string[] = await getTodosInStorage();

    for (let i = 0; i < storageData.length; i++) {
      if (storageData[i] === old) {
        storageData[i] = newTodo;
        const parsed: string = JSON.stringify(storageData);
        await AsyncStorage.setItem(TODO_COLLECTION, parsed);
        return true;
      }
    }
    return false;
  } catch (err) {
    throw new Error("There is any error");
  }
}
export async function removeTodo(todo: string) {
  try {
    const storageData: string[] = await getTodosInStorage();
    const removed: string[] = storageData.filter((item) => item != todo);

    const parsed: string = JSON.stringify(removed);
    await AsyncStorage.setItem(TODO_COLLECTION, parsed);
    return true;
  } catch (err) {
    throw new Error("There is any error");
  }
}
