import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {MyAppApi} from '../api/myAppapi';
import {
  addTaskFailure,
  addTaskStart,
  addTaskSuccess,
  getTaskListFailure,
  getTaskListStart,
  getTaskListSuccess,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
  checkTaskFailure,
  checkTaskSuccess,
  checkTaskStart,
} from '../redux/TodoSlice';

export function* handleGetTaskList(action) {
  try {
    const url = MyAppApi.TodoList(action.payload);
    const response = yield call(axios.get, url);
    yield put(getTaskListSuccess(response.data));
  } catch (error) {
    yield put(getTaskListFailure(error));
  }
}

export function* handleAddTask({payload}) {
  try {
    const response = yield call(
      axios.post,
      MyAppApi.postTask,
      JSON.stringify(payload),
    );
    yield put(addTaskSuccess(response.data));
  } catch (error) {
    yield put(addTaskFailure(error));
  }
}

export function* handleUpdateTask({payload}) {
  try {
    const response = yield call(
      axios.put,
      MyAppApi.putTask(payload.id),
      payload,
    );
    yield put(updateTaskSuccess(response.data));
  } catch (error) {
    yield put(updateTaskFailure(error));
  }
}

export function* handleDeleteTask(action) {
  try {
    const id = action.payload;
    const url = MyAppApi.deleteTask(id);
    const response = yield call(axios.delete, url);
    yield put(deleteTaskSuccess(id));
  } catch (error) {
    yield put(deleteTaskFailure(error));
  }
}

export function* handleCheckTask({payload}) {
  try {
      const response = yield call(
        axios.put,
        MyAppApi.putTask(payload.id),
        payload,
      );
      yield put(checkTaskSuccess(response.data));
  } catch (error) {
    yield put(checkTaskFailure(error));
  }
}
export default function* todoSaga() {
  yield takeLatest(getTaskListStart, handleGetTaskList);
  yield takeLatest(addTaskStart, handleAddTask);
  yield takeLatest(updateTaskStart, handleUpdateTask);
  yield takeLatest(deleteTaskStart, handleDeleteTask);
  yield takeLatest(checkTaskStart, handleCheckTask);
}
