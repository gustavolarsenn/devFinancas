import Login from "./pages/Login/login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register/register";
import Dashboard from "./pages/Dashboard/dashboard";
import Cadastro from "./pages/Cadastro/cadastro";
import Historico from "./pages/Historico/historico";

const AppRoutes = () => {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registro" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
          <Route path="/historico" element={<Historico />}/>
        </Routes>
      </Router>
    )
}

export default AppRoutes