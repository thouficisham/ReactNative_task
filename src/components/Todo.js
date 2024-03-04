import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect, useDebugValue } from 'react';
import Fallback from './Fallback';
import Icon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { MyAppApi } from '../api/myAppapi';

const Todo = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [validation, setValidation] = useState(false);
  const [loginUserDetails, setLoginUserDetails] = useState({})

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        let userDetails = JSON.parse(userInfo);
        setLoginUserDetails(userDetails)
        getTaskList(userDetails.id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);

  const getTaskList = (id) => {
    {
      const url = MyAppApi.TodoList(id);
      axios.get(url)
          .then((res) => setTaskList(res.data))
          .catch((err) => Alert.alert(err))
          .finally(() => { })
  }
  }

  const handleAddTodo = async () => {
    if (task.trim() === '') {
      return setValidation(true);
    }

const input = {
  userid: loginUserDetails.id,
  task: task,
  complete: false
};

 await axios.post(MyAppApi.postTask, JSON.stringify(input))
  .then((response) => {
    setTaskList([
      ...taskList,
      response.data
    ]);
  })
  .catch(error => {
    console.error('Error adding new todo item:', error);
  });
    setTask('');
    setValidation(false);
  };

  const handleEditTask = (item) => {
    setEditTask(item);
    console.log(item, "edit");
    setTask(item.task);
  };

  const handleUpdateTask =  () => {
        let url = MyAppApi.putTask(editTask.id)
        let input = {
          id: editTask.id,
          userid: editTask.userid,
          task: task,
          complete: editTask.complete
        }
        axios.put(url, input)
        .then(response => {
          const updatedTaskIndex = taskList.findIndex(task => task.id === response.data.id);
          if (updatedTaskIndex !== -1) {
            const updatedTaskList = [...taskList];
            console.log(updatedTaskList);
            updatedTaskList[updatedTaskIndex] = response.data;
            setTaskList(updatedTaskList);
          } else {
            console.error('Task not found in taskList');
          }
        })
        .catch(error => console.log(error));
          
    setEditTask(null);
    setTask('');
  };

  const handleDeleteTask = id => {
       
    // const updatedTaskList = taskList.filter(task => task.id !== id);
    // setTaskList(updatedTaskList);
    let url = MyAppApi.deleteTask(id)
    axios.delete(url)
    .then(res => {
      const updateTaskList = taskList.filter((task) => task.id !== res.data.id)
      console.log(updateTaskList, "res")
      setTaskList(updateTaskList)})
    .catch(err =>console.log(err))
  };



  const handleCheck = task => {
    const updatedTask = { ...task, complete: !task.complete };
    let url = MyAppApi.putTask(task.id);
    axios.put(url, updatedTask)
      .then(res => {
          console.log(res.data, "res");
          const updateTaskList = taskList.map((item) => {
            if(item.id === res.data.id) {
              return updatedTask
            }
            return item;
          })
          console.log(updateTaskList);
          setTaskList(updateTaskList)
      })
      .catch(err => console.log(err));
};


  const renderTask = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: '#82A3FF',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 3,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 800,
            flex: 1,
            textDecorationLine: item.complete ? 'line-through' : 'none',
          }}>
          {item.task}
        </Text>
        <CheckBox
          checked={item.complete}
          onPress={() => handleCheck(item)}
          checkedColor="green"
          uncheckedColor="#fff"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.4 }}>
          <Icon
            name="edit"
            color={'#fff'}
            size={30}
            onPress={() => handleEditTask(item)}
            disabled={item.complete === true}
          />
          <Icon
            name="delete"
            color={'#fff'}
            size={30}
            onPress={() => handleDeleteTask(item.id)}
            disabled={item.complete === true}
          />
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView behavior={'padding'}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#242424',
                fontSize: 20,
                fontWeight: 'bold',

              }}>
              Todo
            </Text>
          </View>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: '#82A3FF',
              borderRadius: 6,
              paddingHorizontal: 6,
              paddingVertical: 12,
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 16,
            }}
            placeholder="Add a task"
            value={task}
            onChangeText={userText => setTask(userText)}
          />
          {validation && <Text style={{ color: 'red' }}>please fill task</Text>}
          {editTask ? (
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                borderRadius: 6,
                paddingVertical: 8,
                alignItems: 'center',
                marginVertical: 34,
              }}
              onPress={() => handleUpdateTask()}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                borderRadius: 6,
                paddingVertical: 8,
                alignItems: 'center',
                marginVertical: 34,
              }}
              onPress={() => handleAddTodo()}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                + Add
              </Text>
            </TouchableOpacity>
          )}
          <FlatList data={taskList} renderItem={renderTask} />
          {taskList.length <= 0 && <Fallback />}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Todo;
