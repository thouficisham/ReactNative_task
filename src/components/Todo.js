import {
  ActivityIndicator,
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
import React, {useState, useEffect, useDebugValue} from 'react';
import Fallback from './Fallback';
import Icon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MyAppApi} from '../api/myAppapi';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTaskStart,
  checkTaskStart,
  clearEditTask,
  deleteTaskStart,
  getTaskListStart,
  setEditTask,
  updateTaskStart,
} from '../redux/TodoSlice';

const Todo = () => {
  const [task, setTask] = useState('');
  const [validation, setValidation] = useState(false);
  const [loginUserDetails, setLoginUserDetails] = useState({});
  const dispatch = useDispatch();
  const taskList = useSelector(state => state.todoApp.taskList);
  const editTask = useSelector(state => state.todoApp.editTask);
  const loading = useSelector(state => state.todoApp.loading);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        let userDetails = JSON.parse(userInfo);
        setLoginUserDetails(userDetails);
        dispatch(getTaskListStart(userDetails.id));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  const handleAddTodo = () => {
    if (task.trim() === '') {
      return setValidation(true);
    }

    const input = {
      userid: loginUserDetails.id,
      task: task,
      complete: false,
    };
    dispatch(addTaskStart(input));

    setTask('');
    setValidation(false);
  };

  const handleEditTask = item => {
    dispatch(setEditTask(item));
    setTask(item.task);
  };

  const handleUpdateTask = () => {
    let input = {
      id: editTask.id,
      userid: editTask.userid,
      task: task,
      complete: editTask.complete,
    };
    dispatch(updateTaskStart(input));

    dispatch(clearEditTask(null));
    setTask('');
  };

  const handleDeleteTask = id => {
    dispatch(deleteTaskStart(id));
  };

  const handleCheck = task => {
    const updatedTask = {...task, complete: !task.complete};
    let input = {
      id: updatedTask.id,
      userid: updatedTask.userid,
      task: updatedTask.task,
      complete: updatedTask.complete,
    };
    dispatch(checkTaskStart(input));
  };

  const renderTask = ({item, index}) => {
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
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 1,
          shadowRadius: 3,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 800,
            flex: 1,
            textDecorationLine: item?.complete ? 'line-through' : 'none',
          }}>
          {item?.task}
        </Text>
        <CheckBox
          checked={item?.complete}
          onPress={() => handleCheck(item)}
          checkedColor="green"
          uncheckedColor="#fff"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.4,
          }}>
          <Icon
            name="edit"
            color={'#fff'}
            size={30}
            onPress={() => handleEditTask(item)}
            disabled={item?.complete === true}
          />
          <Icon
            name="delete"
            color={'#fff'}
            size={30}
            onPress={() => handleDeleteTask(item.id)}
            disabled={item?.complete === true}
          />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1, overflow: 'scroll'}}>
      <SafeAreaView style={{flex: 1, overflow: 'scroll'}}>
        <View style={{marginHorizontal: 16, marginVertical: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          {validation && <Text style={{color: 'red'}}>please fill task</Text>}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Todo;
