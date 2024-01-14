import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { fireStore } from "firebaseconfig/config";
import { dataProps } from "types/types";


const addToDatabase = async (data: dataProps) => {
  try {
    const insertedData = await addDoc(collection(fireStore, "todos"), data);
  } catch (err) {
    throw new Error(
      `This error ${err} occurred while inserting data into database`
    );
  }
}

const updateOnDatabase = async (doc:any, data: dataProps) => {
  try {
    const insertedData = await updateDoc(doc, data);
    return insertedData;
  } catch (err) {
    throw new Error(
      `This error ${err} occurred while updating the data`
    );
  }
}

const removeOnDatabase = async (doc: any) => {
  try {
    const insertedData = await deleteDoc(doc);
  } catch (err) {
    throw new Error(
      `This error ${err} occurred while inserting data into database`
    );
  }
}

export { addToDatabase, removeOnDatabase, updateOnDatabase };