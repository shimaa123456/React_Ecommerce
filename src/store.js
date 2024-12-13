import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Features/Auth/Components/AuthRedux/LoginSlice';
import registerReducer from './Features/Auth/Components/AuthRedux/RegisterSlice';
import usersReducer from './Features/Admin/Components/AdminRedux/UsersSlice';
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: usersReducer,
  },
});
export default store;