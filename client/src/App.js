import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Patient from "./pages/Patient.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PatientForm from "./pages/PatientForm.jsx";
import PatientList from "./pages/PatientList.jsx";
import Sidebar from "./components/Sidebar.jsx";
import FormMCU from "./pages/FormMcu.jsx";
import FormMCU2 from "./pages/FormMcu2.jsx";
import Queue from "./pages/Queue.jsx";
import AdminQueue from "./pages/QuequeAdmin.jsx";
import FormLab from "./pages/FormLab.jsx";
import Result from "./pages/Result.jsx";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="queue" element={<Queue />} />
        <Route
          path="/"
          element={
            login ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login login={login} setLogin={setLogin} />
            )
          }
        />
        <Route
          path="dashboard"
          element={<Sidebar login={login} setLogin={setLogin} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="patient" element={<Patient />} />
          <Route path="lists" element={<PatientList />} />
          <Route path="register" element={<PatientForm />} />
          <Route path="form-mcu/:id" element={<FormMCU />} />
          <Route path="form-mcu2/:id" element={<FormMCU2 />} />
          <Route path="form-lab/:id" element={<FormLab />} />
          <Route path="admin-queue" element={<AdminQueue />} />
          <Route path="hasil-analisis/:id" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
