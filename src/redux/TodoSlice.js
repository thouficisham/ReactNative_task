// reducers/todoReducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    getTaskListStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTaskListSuccess(state, action) {
      state.taskList = action.payload;
      state.loading = false;
    },
    getTaskListFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess(state, action) {
      state.taskList.push(action.payload);
      state.loading = false;
    },
    addTaskFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setEditTask(state, action) {
      state.editTask = action.payload;
    },
    clearEditTask(state) {
      state.editTask = null;
    },
    updateTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess(state, action) {
      const updatedTaskIndex = state.taskList.findIndex(
        task => task.id === action.payload.id,
      );
      if (updatedTaskIndex !== -1) {
        state.taskList[updatedTaskIndex] = action.payload;
      } else {
        console.error('Task not found in taskList');
      }
      state.loading = false;
    },
    updateTaskFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTaskStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess(state, action) {
      state.taskList = state.taskList.filter(
        task => task.id !== action.payload,
      );
    },
    deleteTaskFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    checkTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    checkTaskSuccess(state, action) {
      const updatedCheckTaskIndex = state.taskList.findIndex(task => task.id === action.payload.id);
      if (updatedCheckTaskIndex !== -1) {
        state.taskList[updatedCheckTaskIndex] =  action.payload;
      }else {
        console.error('Task not found in taskList');
      }
      state.loading = false;
    },
    checkTaskFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getTaskListStart,
  getTaskListSuccess,
  getTaskListFailure,
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
  setEditTask,
  clearEditTask,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
  checkTaskStart,
  checkTaskSuccess,
  checkTaskFailure,
} = todoSlice.actions;
export default todoSlice.reducer;
