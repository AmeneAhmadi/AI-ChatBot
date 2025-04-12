import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";
import chatGPTIconWhite from "../assets/chat-gpt-white.svg";
import chatGPTIconBlack from "../assets/chat-gpt-black.svg";

const Welcome = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();


  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 h-screen ${
        isDarkMode ? "bg-[#343541] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-center items-center w-12">
        <img
          src={isDarkMode ? chatGPTIconWhite : chatGPTIconBlack}
          alt="icon"
          className="w-full h-full"
        />
      </div>
      <p className="flex justify-center items-center text-xs sm:text-base text-center">
        Welcome to ChatGPT
      </p>
      <p className="flex justify-center items-center text-xs sm:text-base text-center">
        Log in with your OpenAI account to continue
      </p>
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#0FA47F] text-white rounded-md py-2 px-4 text-xs sm:text-base"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#0FA47F] text-white rounded-md py-2 px-4 text-xs sm:text-base"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Welcome;
