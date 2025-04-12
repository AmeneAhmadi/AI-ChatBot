import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import userAvatar from "../assets/icons/Avatar User.svg";
import aiAvatar from "../assets/icons/Avatar ChatGPT.svg";
import { BiLike, BiDislike } from "react-icons/bi";

const ChatMessage = ({ index, msg }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div
      key={index}
      className={`flex items-center gap-4 p-2 ${
        msg.sender !== "user"
          ? isDarkMode
            ? "bg-[#6a6e79]"
            : "bg-gray-200"
          : ""
      }`}
    >
      <div className="w-3 sm:w-6 rounded-sm">
        <img
          src={msg.sender === "user" ? userAvatar : aiAvatar}
          alt="avatar"
          className="w-full h-full"
        />
      </div>
      <p
        className={`text-[10px] sm:text-sm w-full ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {msg.text}
      </p>
      {msg.sender !== "user" && (
        <div
          className={`flex gap-2 self-start ${
            isDarkMode ? "text-[#C5C5D1]" : "text-black"
          }`}
        >
          <button
            className={`text-[10px] sm:text-base ${
              isDarkMode
                ? "text-[#C5C5D1] hover:text-white"
                : "text-black hover:text-gray-500"
            }`}
          >
            <BiLike />
          </button>
          <button
            className={`text-[10px] sm:text-base ${
              isDarkMode
                ? "text-[#C5C5D1] hover:text-white"
                : "text-black hover:text-gray-500"
            }`}
          >
            <BiDislike />
          </button>
        </div>
      )}
    </div>
  );
};
export default ChatMessage;
ChatMessage.propTypes = {
  index: PropTypes.number,
  msg: PropTypes.object,
};
