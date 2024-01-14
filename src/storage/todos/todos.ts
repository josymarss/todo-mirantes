import AsyncStorage from "@react-native-async-storage/async-storage";
import { TODO_COLLECTION } from "storage/storage.config";
import { dataProps } from "types/types";

export async function addTodoOnStorage(allevents: any) {
  try{
    const parsed: string = JSON.stringify(allevents);
    await AsyncStorage.setItem(TODO_COLLECTION, parsed);
  } catch (err) {
    throw new Error("There is any error");
  }
}

export async function getTodoOnStorage() {
  try {
    const data: any = await AsyncStorage.getItem(TODO_COLLECTION);
    return data ? data : [];
  } catch (err) {
    throw new Error("There is any error");
  }
}

// export async function updateTodo(old: string, newTodo: string) {
//   try {
//     const storageData: string[] = await getTodosInStorage();

//     for (let i = 0; i < storageData.length; i++) {
//       if (storageData[i] === old) {
//         storageData[i] = newTodo;
//         const parsed: string = JSON.stringify(storageData);
//         await AsyncStorage.setItem(TODO_COLLECTION, parsed);
//         return true;
//       }
//     }
//     return false;
//   } catch (err) {
//     throw new Error("There is any error");
//   }
// }

// export async function removeTodo(todo: string) {
//   try {
//     const storageData: string[] = await getTodosInStorage();
//     const removed: string[] = storageData.filter((item) => item != todo);

//     const parsed: string = JSON.stringify(removed);
//     await AsyncStorage.setItem(TODO_COLLECTION, parsed);
//     return true;
//   } catch (err) {
//     throw new Error("There is any error");
//   }
// }
