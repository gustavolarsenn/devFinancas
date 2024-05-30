import Login from "./pages/Login/login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register/register";
import Dashboard from "./pages/Dashboard/dashboard";
import Cadastro from "./pages/Cadastro/cadastro";
import Historico from "./pages/Historico/historico";
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './components/authProvider';
const AppRoutes = () => {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rotas protegidas */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/cadastro" element={<ProtectedRoute />}>
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>
          <Route path="/historico" element={<ProtectedRoute />}>
            <Route path="/historico" element={<Historico />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;