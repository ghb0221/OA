import { createSlice } from '@reduxjs/toolkit';
import http from '../../utils/http';

let checksSlice = createSlice({
  name: 'checks',   
  initialState: {
  },
  reducers: {
    
  }
});

const toNames = (payload) => {
  return (dispatch) => {
    return http.get('/users', payload).then((res)=>{
      return res.data;
    })
  };
};

const addCheck = (payload) => {
  return (dispatch) => {
    return http.post('/checks', payload).then((res)=>{
      return res.data;
    })
  };
};

const fromChecks = (payload) => {
  return (dispatch) => {
    return http.post('/checks', payload).then((res)=>{
      return res.data;
    })
  };
};

export {
  checksSlice,
  toNames,
  addCheck,
  fromChecks
}