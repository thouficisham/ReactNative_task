import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Fallback from './Fallback';
import Icon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';

const Todo = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [validation, setValidation] = useState(false);

  const handleAddTodo = () => {
    if (task.trim() === '') {
      return setValidation(true);
    }

    setTaskList([
      ...taskList,
      {id: Date.now().toString(), title: task, complete: false},
    ]);
    setTask('');
    setValidation(false);
  };

  const handleDeleteTask = id => {
    const updatedTaskList = taskList.filter(task => task.id !== id);
    setTaskList(updatedTaskList);
  };

  const handleEditTask = task => {
    setEditTask(task);
    setTask(task.title);
  };

  const handleUpdateTask = () => {
    const updatedTaskList = taskList.map(item => {
      if (item.id === editTask.id) {
        return {...item, title: task};
      }
      return item;
    });
    setTaskList(updatedTaskList);
    setEditTask(null);
    setTask('');
  };

  const handleCheck = task => {
    const updatedTaskList = taskList.map(item => {
      if (item.id === task.id) {
        return {...item, complete: !item.complete};
      }
      return item;
    });
    setTaskList(updatedTaskList);
  };

  const renderTask = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#b76cfd',
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
            textDecorationLine: item.complete ? 'line-through' : 'none',
          }}>
          {item.title}
        </Text>
        <CheckBox
          checked={item.complete}
          onPress={() => handleCheck(item)}
          checkedColor="green"
          uncheckedColor="#fff"
        />
        <View  style={{flexDirection: 'row',justifyContent: 'space-between', flex: 0.4}}>
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
    <View style={{marginHorizontal: 16, marginVertical: 50}}>
      <Text
        style={{
          color: '#242424',
          fontSize: 20,
          fontWeight: 'bold',
          margin: 10,
        }}>
        Todo
      </Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#b76cfd',
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Todo;
