import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/Landing";
import EmployeeForm from "./pages/EmployeeForm.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/new/employee" element={<EmployeeForm />} />
        </Routes>
    );
}

export default App
