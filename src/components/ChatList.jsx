import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { ThemeContext } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { FiMessageSquare } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

const ChatList = ({ editChatTitleAndShowModal }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { chats, activeChatId, deleteChat, selectChat } =
    useContext(ChatContext);

  return (
    <div className="flex flex-col gap-2 h-full w-full mt-1 overflow-y-auto">
      {chats
        .slice()
        .reverse()
        .map((chat) => (
          <button
            key={chat.id}
            onClick={() => {
              selectChat(chat.id);
            }}
            className={`flex justify-between items-center gap-2 p-2 rounded-md ${
              chat.id === activeChatId
                ? isDarkMode
                  ? "bg-[#343540] border border-white"
                  : "bg-[#c1c2c7] border border-black"
                : isDarkMode
                ? "bg-[#343540]"
                : "bg-[#c1c2c7]"
            }`}
          >
            <FiMessageSquare size={12} />
            <p className="capitalize truncate text-[11px]">{chat.title}</p>
            <div className="flex gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  editChatTitleAndShowModal(chat);
                }}
                className={`${
                  isDarkMode
                    ? "text-[#C5C5D1] hover:text-white"
                    : "text-black hover:text-gray-500"
                } cursor-pointer`}
              >
                <FiEdit3 size={12} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className={`${
                  isDarkMode
                    ? "text-[#C5C5D1] hover:text-white"
                    : "text-black hover:text-gray-500"
                } cursor-pointer`}
              >
                <FaRegTrashAlt size={12} />
              </div>
            </div>
          </button>
        ))}
    </div>
  );
};
export default ChatList;

ChatList.propTypes = {
  editChatTitleAndShowModal: PropTypes.func,
};
