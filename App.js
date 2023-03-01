import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { search, getURL } from 'pagalworld';


export default function App() {
  const [input, setinput] = useState('');
  const [item, setitem] = useState([]);
  
  useEffect(() => {
    getData()
  }, []);
  
  useEffect(() => {
    storeData(item)
  }, [item]);
  song();
  const song = async ()=>{

    let songPage = await search('Love me like you do');
    console.log(songPage);
    
    let songURL = await getURL('Love me like you do');
    console.log(songURL);
  }


  const add = ()=>{
    // console.log(input);
    Keyboard.dismiss()
    setitem([...item, input]);
    setinput('')
    // console.log(item);
    // storeData(item)
  }

  const remove = (index)=>{
    const cpy = [...item]
    cpy.splice(index,1)
    setitem(cpy)
  }

  const storeData = async (item) => {
    try {
      // item.map((val, index)=>{
      //   console.log(val);
      // })
      const jsonItem = JSON.stringify(item)
      await AsyncStorage.setItem('todos', jsonItem)
      // console.log('Saved');
      // console.log(jsonItem);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('todos')
    if(value !== null) {
      // value previously stored
      const parsedVal = await JSON.parse(value)
      setitem(parsedVal)
      // console.log('received');
      // console.log(parsedVal);
    }
  } catch(e) {
    // error reading value
  }
}


  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text  style={styles.title}>Today's task</Text>
        <ScrollView>
        <View style={styles.items}>
          {/* <Text>task 1</Text>
          <Text>task 2</Text> */}
          {item.map((val, index)=>
          <TouchableOpacity key= {index} onPress= {()=>remove(index)}>
          <Task text={val} />
          </TouchableOpacity>
           )}
          {/* <Task text = 'hello this is manjeet kumar frinjd fkjdbfckjdbkjjo this is manjeet kumar frinjd fkjdbfckjdbkjjdbc df'/> */}
          {/* <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/>
          <Task text = 'hello 2'/> */}
        </View>
          </ScrollView>
      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding': 'height'}
      style={styles.writeTextWrapper}
      >
        <TextInput  style={styles.input} placeholder='Write a task' value={input} onChangeText={(task)=>setinput(task)}/>
        <TouchableOpacity onPress={add}>
        <View style={styles.addTextWrapper}>
          <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#e8eaed'
  },
  taskWrapper:{
    // backgroundColor: 'yellow',
    paddingTop: 80,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10
  },
  items:{
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 180
  },
  writeTextWrapper:{
    // backgroundColor: 'pink',
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input:{
    padding: 15,
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c0c0c0'
  },
  addTextWrapper:{
    backgroundColor: 'orange',
    width: 60,
    height:  60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c0c0c0'
  },
  addText:{
    fontSize: 30
  }
});
