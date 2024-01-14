import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, onSnapshot } from 'firebase/firestore';
import { fireStore } from 'firebaseconfig/config';
import { addToDatabase,updateOnDatabase, removeOnDatabase } from 'firebaseconfig/operations';
import { dataProps } from 'types/types';

interface Todos{
  value: any[]
}
const initialState: Todos ={
  value: []
};

function getEventFromDataBase() {
  const todoRef = collection(fireStore, "todos");
  const todos: any[] = [];

  const subscriber = onSnapshot(todoRef, {
    next: (snapShot) => {
      snapShot.docs.forEach((doc) => {
        todos.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      initialState.value = todos;
    },
  });

  return () => subscriber();
}
// Call function to get all todo in firebase
getEventFromDataBase();

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // add
    addTodo(state, action){
      // Add to firebase 
      // Update the state with the get from database
      // state.value = 
    },
    // update
    updateTodo(state,action){
      // Update from firebase 
      // Update the state with the get from database
      // state.value = 
    },
    deleteTodo(state){
      state.value = state.value;
      // Update the state with the get from database
      // state.value = 
    }
  }
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;