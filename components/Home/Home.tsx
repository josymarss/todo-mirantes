import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, FlatList, Alert} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {styles } from './styles';

import { ListComponent } from '../List/ListConponent';
import { EmptyList } from '../Empty/EmptyList';

export function Home(){
     const [events, setEvent] = useState<string[]>([])
     // 'Angolan programmers association','Sturt up summit','Feito em Angola', 'Angola Cummunity Dev'
     const [finished, setFinished] = useState<string[]>([])

     const[eventName, setEventName] = useState('');

     function setHandleEvent(value:string){
         setEventName(value)
     }
     function handleAddEvent(){
          if(events.includes(eventName)){
               return Alert.alert('Este evento já existe');
          }
          setEvent(prev => [...prev, eventName]);
          setEventName('');
     }

     function handleFinished(item:string){
          if(finished.includes(item)){
               return setFinished(finished.filter(event => event != item));
          }
          setFinished(prev => [...prev, item])
     }
     function handleUpdate(item:string){
          set
     } 

     function handleRemove(event:string) {
         
           Alert.alert('Apagar','Tem cerrteza que deseja apagar?',[
               {
                    text:'Sim', 
                    onPress:()=> {
                         const data = events.filter(item => item!=event);
                         setEvent(data);
                         Alert.alert('Evento apagado com sucesso!'); 
                         if(finished.includes(event)){
                              setFinished(finished.filter(item => item!=event))
                         }
                    }
               },
                    {
                         text:'Não', 
                         onPress:() => ''
                    }
               
               
           ]);
          
          
     }
     

     return(
          <View style={styles.container}>
               <View style={styles.imageContainer}>
                    <Image source={require('../assets/Logo.png')} resizeMode='contain'/>
               </View>
               <View style={styles.containerList}>
                    <View style={styles.addContainer}>
                         <TextInput value={eventName} onChangeText={setHandleEvent} placeholderTextColor='#808080' placeholder='Adicione uma nova tarefa' style={styles.input}/>
                         <TouchableOpacity style={styles.button}>
                              <Button onPress={handleAddEvent} title='+' color='white' />
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
                              renderItem={({item}) => (
                                   <ListComponent done={finished} eventName ={item} onRemove={() => handleRemove(item)} onFinish={() => handleFinished(item)} onUpdate={handleUpdate}/>
                              )}
                              ListEmptyComponent={EmptyList}
                              
                         />
                    </View>

               </View>

               

              
          </View>
     );
}

