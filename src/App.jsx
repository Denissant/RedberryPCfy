import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/Landing";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import LaptopForm from "./pages/LaptopForm.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/new/employee" element={<EmployeeForm />} />
            <Route path="/new/laptop" element={<LaptopForm />} />
        </Routes>
    );
}

export default App
