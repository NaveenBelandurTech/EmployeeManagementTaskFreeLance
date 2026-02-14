import {configureStore} from '@reduxjs/toolkit'
import UserReducer from '../utils/userSlice'


const Store = configureStore({
    reducer:{
       users:UserReducer,
    }
})


export default Store