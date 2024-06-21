import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authentication/authSlice';


const store = configureStore({
    reducer: {
        auth : authSlice,
        // add more here
    }
})

export default store;
