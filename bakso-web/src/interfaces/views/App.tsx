import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import { getToken } from '../../infrastructure/security/JwtAccessTokenManager';
import './App.css';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props
  const isLoggedIn: boolean = getToken() != null;
  const location = useLocation()

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}

const App: FC = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  </BrowserRouter>
)

export default App;
