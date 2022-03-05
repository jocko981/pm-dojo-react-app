import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// styles
import "./App.css";
// context
import { useAuthContext } from "./hooks/useAuthContext";
// components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import OnlineUsers from "./components/onlineUsers/OnlineUsers";
// pages
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          {user && <Sidebar />}
          {/* "App" css class is display: flex; so Sidebar will sit next to "container" class */}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/" />} />
              <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/" />} />
              <Route path="*" element={<h1>Bad URL...</h1>} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      }
    </div>
  );
}

export default App