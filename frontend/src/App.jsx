import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
    console.log("App.jsx");
    return (
        <>
            <div>
                <div className="flex h-14 bg-blue-400 justify-center">
                    <h1 className="m-2 p-2 text-lg font-bold ">Banking Application</h1>
                </div>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/send" element={<SendMoney />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;