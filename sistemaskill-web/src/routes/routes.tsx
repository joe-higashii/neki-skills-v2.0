import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./private.routes";
import SignUp from "@/pages/signup/SignUp";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
export default function AllRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route Component={Login} path="/" />
            <Route Component={SignUp} path="/signup" />
            <Route element={<PrivateRoutes />}>
              <Route Component={Home} path="/home" />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
