
import { store } from '../store';
import { listUsers } from '../store/modules/users';

import { lazy } from "react";
const Index = lazy( () => import('../views/Index/Index') );
const Login = lazy( () => import('../views/Login/Login') );
const Home = lazy( () => import('../views/Home/Home') );
const UserList = lazy( () => import('../views/UserList/UserList') );
const CheckList = lazy( () => import('../views/CheckList/CheckList') );
const CheckApply = lazy( () => import('../views/CheckApply/CheckApply') );
const CheckAdd = lazy( () => import('../views/CheckAdd/CheckAdd') );

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'home/index',
        component: Home,
        meta: {
          auth: true
        }
      },
      {
        path: 'user/list',
        component: UserList,
        meta: {
          auth: true
        }
      },
      {
        path: 'check/list',
        component: CheckList,
        meta: {
          auth: true
        }
      },
      {
        path: 'check/apply',
        component: CheckApply,
        meta: {
          auth: true
        }
      },
      {
        path: 'check/add',
        component: CheckAdd,
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      auth: false
    }
  }
];

const beforeEach = (path, meta) => {
  const token = store.getState().user.token;
  const users = store.getState().users.users;
  if(meta && meta.auth && !token){
    return '/login';
  }

  if( path === '/user/list' && users && users.length === 0 ){
    store.dispatch(listUsers());
  }
};

export { 
  routes,
  beforeEach
}