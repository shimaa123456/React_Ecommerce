import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Features/Auth/Components/AuthRedux/LoginSlice';
import registerReducer from './Features/Auth/Components/AuthRedux/RegisterSlice';
import usersReducer from './Features/Admin/Components/AdminRedux/UsersSlice';
import productsReducer from './Features/Admin/Components/AdminRedux/ProductsSlice';
import ordersSlice from './Features/Admin/Components/AdminRedux/OrdersSlice';
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: usersReducer,
    products: productsReducer,
    orders: ordersSlice,
  },
});
export default store;