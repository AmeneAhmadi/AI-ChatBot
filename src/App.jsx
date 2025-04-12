import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { ChatProvider } from "./contexts/ChatProvider";
import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChatBot from "./components/ChatBot";

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  return (
    <ChatProvider>
      <Router>
        <div className={`${isDarkMode ? "bg-[#343541]" : "bg-white"}`}>
          <Routes>
            <Route path="/" element={user ? <ChatBot /> : <Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={user ? <ChatBot /> : <Welcome />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
