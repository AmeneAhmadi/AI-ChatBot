import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { ChatContext } from "../contexts/ChatContext";
import EditChatTitle from "./EditChatTitle";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import ChatList from "./ChatList";

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, userLogout } = useContext(AuthContext);
  const {
    chats,
    createNewChat,
    deleteAllChats,
  } = useContext(ChatContext);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);
  const [isEditChatTitleModalOpen, setIsEditChatTitleModalOpen] =
    useState(false);
  const [editingChat, setEditingChat] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //select chat to be updated
  const editChatTitleAndShowModal = (chat) => {
    setEditingChat(chat);
    setIsEditChatTitleModalOpen(true);
  };

  const handleLogOut = () => {
    userLogout();
  };
  const mode = isDarkMode
    ? { icon: <AiOutlineSun size={20} />, text: "Light mode" }
    : { icon: <IoMoonOutline size={20} />, text: "Dark mode" };

  return (
    <div
      className={`flex flex-col h-screen ${
        isMenuOpen ? "w-fit" : "w-10"
      } relative`}
    >
      <div className="flex items-center">
        <button
          className={`p-1 ${
            isDarkMode ? "bg-black text-white" : "bg-[#ECECF1] text-black"
          } rounded-md m-2 top-4 left-4 z-10`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          title={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <GoSidebarExpand size={20} />
          ) : (
            <GoSidebarCollapse size={20} />
          )}
        </button>
        <p
          className={` ${
            isDarkMode ? "bg-black text-white" : "bg-[#ECECF1] text-black"
          } rounded-full text-xs w-fit p-2 border`}
        >
          {user.username}
        </p>
      </div>
      <div
        className={`absolute top-12 sm:relative sm:top-0 p-2 ${
          isDarkMode ? "bg-black text-white" : "bg-[#ECECF1] text-black"
        } flex flex-col justify-between h-[calc(100vh-48px)] w-48 md:w-56 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={createNewChat}
          className="w-full rounded-md border border-[#9A9B9F] py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm"
        >
          <AiOutlinePlus size={20} />
          New chat
        </button>
        <ChatList editChatTitleAndShowModal={editChatTitleAndShowModal}/>
        <div className="border-t border-[#9A9B9F] w-full py-3 flex flex-col gap-2">
          {chats.length > 0 && (
            <button
              onClick={deleteAllChats}
              className="w-full py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm"
            >
              <FaRegTrashAlt size={18} />
              Clear conversations
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="w-full py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm"
          >
            {mode.icon}
            {mode.text}
          </button>
          <button className="w-full py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm">
            <FaDiscord size={20} />
            OpenAi Discord
          </button>
          <button className="w-full py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm">
            <BsBoxArrowUpRight size={18} />
            Updates & FAQ
          </button>
          <button
            onClick={handleLogOut}
            className="w-full py-2 px-4 flex items-center gap-4 text-[10px] md:text-sm"
          >
            <MdOutlineLogout size={20} />
            Log out
          </button>
        </div>
      </div>
      {isEditChatTitleModalOpen && (
        <EditChatTitle
          hideEditChatTitleModal={() => setIsEditChatTitleModalOpen(false)}
          editingChat={editingChat}
        />
      )}
    </div>
  );
};
export default Sidebar;
