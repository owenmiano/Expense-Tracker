import {Routes,Route,Navigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import Home from './pages/Home';
import Login from './pages/Login';
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Register from "./pages/Register";
import NavBar from "./components/Navbar";
import { TransacContextProvider } from "./context/TransacContext";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const {user}=useContext(AuthContext)
  return (
    <TransacContextProvider user={user}>
    <NavBar/>
    <Container className="text-secondary">
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<Navigate to="/"/>} />
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route element={<PrivateRoutes user={user}/>}>
              <Route path="/" element={<Home/>} />
      </Route>
    </Routes>
    </Container>
    </TransacContextProvider>
  );
}

export default App;
