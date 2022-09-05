import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/Landing";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import LaptopForm from "./pages/LaptopForm.jsx";
import SuccessPage from "./pages/Success";
import LaptopListPage from "./pages/LaptopList";
import LaptopDetails from "./pages/LaptopDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/new/employee" element={<EmployeeForm />} />
            <Route path="/new/laptop" element={<LaptopForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/list" element={<LaptopListPage />} />
            <Route path="/details/:id" element={<LaptopDetails />} />
        </Routes>
    );
}

export default App
