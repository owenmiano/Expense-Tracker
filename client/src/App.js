import {Routes,Route,Navigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import Home from './pages/Home';
import Login from './pages/Login';
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Register from "./pages/Register";
import NavBar from "./components/Navbar";
function App() {
  const {user}=useContext(AuthContext)
  return (
    <>
    <NavBar/>
    <Container className="text-secondary">
    <Routes>
      <Route path="/" element={user ? <Home/> : <Login/>} />
      <Route path="/register" element={user ? <Home/> : <Register/>} />
      <Route path="/login" element={user ? <Home/> : <Login/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </Container>
        </>
  );
}

export default App;
