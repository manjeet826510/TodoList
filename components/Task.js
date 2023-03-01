import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Task = (props) => {
  return (
    <View style={styles.task}>
    <View style={styles.itemLeft}>
        <View  style={styles.square}></View>
      <Text style={styles.taskText}>{props.text}</Text>   
    </View>
    <View style={styles.circle}></View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
    task:{
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        // display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    itemLeft:{
        // backgroundColor: 'orange',
        // display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center'
        // alignItems: 'center'
    },
    square:{
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    taskText:{
        maxWidth: '80%'
    },
    circle:{
        // backgroundColor: 'black',
        borderColor: '#55bcf6',
        borderRadius: 5,
        borderWidth: 2,
        height: 12,
        width: 12
    },
})