import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route path="/Employee" element={<AddEmployee />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
