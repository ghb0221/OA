import { createSlice } from '@reduxjs/toolkit';
import http from '../../utils/http';

let usersSlice = createSlice({
  name: 'users',   
  initialState: {
    users: []
  },
  reducers: {
    updateUsers: (state, action) => {
      for(let i=0;i<action.payload.length;i++){
        action.payload[i].key = action.payload[i].id;
      }
      state.users = action.payload;
    }
  }
});

const listUsers = () => {
  return (dispatch) => {
    return http.get('/users').then((res)=>{
      dispatch({
        type: 'users/updateUsers',
        payload: res.data
      });
    })
  };
}

const addUsers = (payload) => {
  return (dispatch) => {
    return http.post('/users', payload).then((res)=>{
      return res.data;
    })
  };
};

const removeUsers = (payload) => {
  return (dispatch) => {
    return http.delete(`/users/${payload}`).then((res)=>{
      return res.data;
    })
  };
}

export {
  usersSlice,
  listUsers,
  addUsers,
  removeUsers
}