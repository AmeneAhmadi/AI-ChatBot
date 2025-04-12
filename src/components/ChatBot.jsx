import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const ChatBot = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "bg-[#343541]" : "bg-white"} flex`}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default ChatBot;
