import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Features/Auth/Components/AuthRedux/LoginSlice';
import registerReducer from './Features/Auth/Components/AuthRedux/RegisterSlice';
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});
export default store;