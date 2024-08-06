import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Deposite from './pages/Deposite';
import NoMatch from "./pages/NoMatch";

import LoginLayout from './layout/LoginLayout';
import DashboardLayout from './layout/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }/>
        <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }/>

          <Route path="/deposite" element={
            <DashboardLayout>
              <Deposite />
            </DashboardLayout>
          }/>

        <Route path="/user" element={
            <DashboardLayout>
              <User />
            </DashboardLayout>
          }/>
        
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
