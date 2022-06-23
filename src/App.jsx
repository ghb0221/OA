
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import './App.css';
import { routes, beforeEach } from './router';
import { Spin } from 'antd';
import { Suspense } from 'react';

function App() {
  let location = useLocation();
  let ret = [];
  routes.forEach((route)=>{
    ret.push(route);
    if(route.children){
      route.children.forEach((childRoute)=>{
        let cloneChildRoute = {...childRoute};
        if(route.path === '/'){
          cloneChildRoute.path = route.path + childRoute.path
        }
        else{
          cloneChildRoute.path = route.path + '/' + childRoute.path
        }
        ret.push(cloneChildRoute);
      })
    }
  })

  let route = ret.find((v) => v.path === location.pathname )

  let meta = route && route.meta; 
  let navigateUrl = beforeEach(location.pathname, meta);

  return (
    <div className="App">   
        {
          route 
          ?
          <Suspense fallback={ <Spin className="spin" />  }>
          <Routes>
            {
              routes.map((v) => {
                return (
                  <Route path={v.path} key={v.path} element={ navigateUrl ? <Navigate to={navigateUrl} /> : <v.component /> }>
                    {v.children && v.children.map((v)=>{
                      return <Route path={v.path} key={v.path} element={ navigateUrl ? <Navigate to={navigateUrl} /> : <v.component /> }  />
                    })}
                  </Route>
                )
              })
            }
          </Routes>
          </Suspense>
          : 
          <div>404</div>
        }   
        
    </div>
  );
}

export default App;
