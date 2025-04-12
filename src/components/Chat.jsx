import { useContext, useMemo, useState, useCallback } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ChatContext } from "../contexts/ChatContext";
import StartScreen from "./StartScreen";
import ChatMessage from "./ChatMessage";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
  const { chats, activeChatId, addChat, addAiResponse } =
    useContext(ChatContext);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleInputChange = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const clickSend = async () => {
    if (!prompt.trim()) return;
    const chatId = await addChat(prompt);
    await addAiResponse(prompt, chatId);
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clickSend();
    }
  };

  const chatMessages = useMemo(() => {
    return (activeChat?.messages || []).map((msg, index) => (
      <ChatMessage key={index} index={index} msg={msg} />
    ));
  }, [activeChat]);

  return (
    <div
      className={`flex flex-col justify-between px-1 sm:px-10 w-full ${
        isDarkMode ? "bg-[#343540] text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full ">
        {(activeChat?.messages || []).length === 0 ? (
          <div className="flex justify-center items-center pt-[10%]">
            <StartScreen />
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-6 h-[88vh] w-full mt-1 overflow-y-auto pt-5 ">
            {chatMessages}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full self-end mt-4">
        <div
          className={`flex justify-between items-center w-full rounded-sm px-2 ${
            isDarkMode
              ? "bg-[#444654] text-[#8E8E9E]"
              : "bg-[#ECECF1] text-black"
          }`}
        >
          <input
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type="text"
            className="p-2 outline-none w-5/6 bg-transparent placeholder:text-[10px] sm:placeholder:text-sm"
            placeholder="Ask anything ..."
          />
          <button onClick={clickSend}>
            <IoMdSend size={20} />
          </button>
        </div>
        <p
          className={`text-[6px] sm:text-[8px] md:text-xs py-2 ${
            isDarkMode ? "text-[#8E8E9E]" : "text-black"
          }`}
        >
          <a href="#" className="underline">
            ChatGPT Jan 9 Version
          </a>
          . Free Research Preview. Our goal is to make AI systems more natural
          and safe to interact with. Your feedback will help us improve.
        </p>
      </div>
    </div>
  );
};

export default Chat;
