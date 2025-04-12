import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { ChatContext } from "../contexts/ChatContext";

const EditChatTitle = ({ hideEditChatTitleModal, editingChat }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { editChatTitle } = useContext(ChatContext);
  const [chatTitle, setChatTitle] = useState(editingChat.title);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitChatTitle = (e) => {
    e.preventDefault();
    editChatTitle(editingChat.id, chatTitle);
    setChatTitle("");
    hideEditChatTitleModal();
  };

  const handleChatTitleChange = (e) => {
    setChatTitle(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitChatTitle(e);
    }
  };
  return (
    <div className="flex justify-center w-full h-full fixed top-0 left-0 pt-[10%]">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-2"></div>
      <div
        className={`${
          isDarkMode ? "bg-[#252525] border-white" : " bg-white border-black"
        } border rounded-2xl w-[500px] h-[200px] flex justify-between flex-col items-center p-6 mt-28 z-10`}
      >
        <h2
          className={`Kanit-Medium sm:text-xl ${
            isDarkMode ? "text-white" : "text-black"
          } uppercase`}
        >
          chat title
        </h2>
        <input
          type="text"
          value={chatTitle}
          ref={inputRef}
          onChange={handleChatTitleChange}
          onKeyDown={handleKeyDown}
          className={`${
            isDarkMode
              ? "border-white placeholder-[#343540] text-white caret-white"
              : "border-black text-black caret-black"
          } bg-transparent  w-[96%] outline-none border py-2 px-4 rounded-md`}
          placeholder="Input your title..."
        />
        <div
          className={`flex justify-center items-center gap-4 w-full ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <button
            onClick={hideEditChatTitleModal}
            className=" rounded-md border border-[#9A9B9F] py-2 px-4 flex items-center gap-4 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={submitChatTitle}
            className=" rounded-md border border-[#9A9B9F] py-2 px-4 flex items-center gap-4 text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditChatTitle;

EditChatTitle.propTypes = {
  hideEditChatTitleModal: PropTypes.func,
  editingChat: PropTypes.object,
};
