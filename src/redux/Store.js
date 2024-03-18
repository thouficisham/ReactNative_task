import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoSliceReducer from './TodoSlice';
import todoSaga from '../redux-saga/todoSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todoApp: todoSliceReducer,
  },
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(todoSaga);
