import Container from "./components/container";
import Login from "../src/pages/Login/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register/register";
import Dashboard from "./pages/Dashboard/dashboard";


function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registro" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </Container>
  )
}

export default App;
