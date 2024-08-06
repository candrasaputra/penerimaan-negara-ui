import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./pages/Login/Index";
import Dashboard from "./pages/Dashboard/Index";
import User from "./pages/User/Index";
import Deposite from './pages/Deposite/Index';
import DepositeDetail from './pages/Deposite/DepositeDetail';
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

          {['/', '/dashboard'].map((path) => (
            <Route path={path} element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }/>
          ))}

          <Route path="/deposite" element={
            <DashboardLayout>
              <Deposite />
            </DashboardLayout>
          }/>

          <Route path="/deposite/:id" element={
            <DashboardLayout>
              <DepositeDetail />
            </DashboardLayout>
          }/>

        <Route path="/user" element={
            <DashboardLayout>
              <User />
            </DashboardLayout>
          }/>
        
        <Route path="/user/add" element={
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
