import { createSlice } from '@reduxjs/toolkit';
import http from '../../utils/http';

let userSlice = createSlice({
  name: 'user',   
  initialState: {
    token: '',
    info: {}
  },
  reducers: {    
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateInfo: (state, action) => {
      state.info = action.payload;
    },
    clearUser: (state) => {
      state.token = '';
      state.info = '';
    }
  }
});

const { clearUser } = userSlice.actions;

const login = (payload) => {
  return (dispatch) => {
    //console.log(payload);
    return http.get('/users', payload).then((res)=>{
      //console.log(res.data);
      if(res.data.length === 1){
        dispatch({
          type: 'user/updateToken',
          payload: res.data[0].token
        })
        dispatch({
          type: 'user/updateInfo',
          payload: { name: res.data[0].name, role: res.data[0].role, id: res.data[0].id }
        })
      }
      return res.data.length === 1;
    })
  };
}



export {
  userSlice,
  login,
  clearUser
}