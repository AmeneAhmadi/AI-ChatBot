import { useContext, useEffect, useReducer } from "react";
import { ChatContext } from "./ChatContext";
import { fetchAIResponse } from "../api/FetchAIResponse";
import { chatsReducer, initialState } from "../reducers/ChatReducer";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import {
  getUserChats,
  createChatInDB,
  updateChatInDB,
  deleteChatFromDB,
  deleteAllChatsFromDB,
  updateChatTitle,
} from "../api/Chats";
import { v4 as uuidV4 } from "uuid";

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, initialState);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const loadChats = async () => {
        try {
          const savedChats = await getUserChats(user.id);
          dispatch({ type: "LOAD_CHATS", payload: savedChats || [] });
        } catch (error) {
          console.error("Error loading chats:", error);
        }
      };
      loadChats();
    }
  }, [user]);

  const addChat = async (prompt) => {
    let chatId = state.activeChatId;
    if (!chatId) {
      chatId = uuidV4();
      const newChat = {
        id: chatId,
        createdAt: new Date(),
        userId: user.id,
        title: prompt.split(" ").slice(0, 5).join(" ") || "Untitled Chat",
        messages: [
          { id: uuidV4(), createdAt: new Date(), text: prompt, sender: "user" },
        ],
      };
      dispatch({ type: "ADD_CHAT", payload: newChat });
      await createChatInDB(newChat);
    } else {
      const newMessage = {
        id: uuidV4(),
        createdAt: new Date(),
        text: prompt,
        sender: "user",
      };
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          chatId,
          message: newMessage,
        },
      });

      const chatToUpdate = state.chats.find((chat) => chat.id === chatId);
      if (chatToUpdate) {
        const updatedChat = {
          ...chatToUpdate,
          messages: [...chatToUpdate.messages, newMessage],
        };
        await updateChatInDB(updatedChat);
      }
    }
    return chatId;
  };

  const addAiResponse = async (prompt, chatId) => {
    let streamedResponse = "";
    const tempMessageId = uuidV4();

    dispatch({
      type: "ADD_AI_RESPONSE",
      payload: {
        chatId,
        aiResponse: {
          id: tempMessageId,
          createdAt: new Date(),
          text: "",
          sender: "ai",
        },
      },
    });

    const handleStreamUpdate = (partialText) => {
      streamedResponse = partialText;
      dispatch({
        type: "UPDATE_AI_RESPONSE",
        payload: { chatId, text: streamedResponse, messageId: tempMessageId },
      });
    };

    const aiResponse = await fetchAIResponse(prompt, handleStreamUpdate);

    dispatch({
      type: "UPDATE_AI_RESPONSE",
      payload: { chatId, text: aiResponse.text, messageId: tempMessageId },
    });

    const chatToUpdate = state.chats.find((chat) => chat.id === chatId);
    if (chatToUpdate) {
      const updatedChat = {
        ...chatToUpdate,
        messages: [
          ...chatToUpdate.messages,
          {
            id: tempMessageId,
            text: aiResponse.text,
            sender: "ai",
          },
        ],
      };
      await updateChatInDB(updatedChat);
    }
  };

  const selectChat = (chatId) => {
    dispatch({ type: "SELECT_CHAT", payload: chatId });
  };

  const createNewChat = () => {
    dispatch({ type: "CREATE_NEW_CHAT" });
  };

  const deleteChat = async (chatId) => {
    let chatToBeDeleted = state.chats.find((chat) => chat.id === chatId);
    if (window.confirm(`Do you want to delete "${chatToBeDeleted.title}" ?`)) {
      dispatch({ type: "DELETE_CHAT", payload: chatId });
      await deleteChatFromDB(chatId);
    }
  };
  const deleteAllChats = () => {
    if (window.confirm("Do you want to clear all conversations?")) {
      dispatch({ type: "DELETE_ALL_CHATS" });
      if (user) {
        deleteAllChatsFromDB(user.id);
      }
    }
  };

  const editChatTitle = async (chatId, newTitle) => {
    dispatch({ type: "EDIT_CHAT_TITLE", payload: { chatId, newTitle } });

    if (user) {
      const chatToUpdate = state.chats.find((chat) => chat.id === chatId);
      if (chatToUpdate) {
        await updateChatTitle({ ...chatToUpdate, title: newTitle });
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        activeChatId: state.activeChatId,
        addChat,
        addAiResponse,
        createNewChat,
        deleteChat,
        editChatTitle,
        selectChat,
        deleteAllChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
ChatProvider.propTypes = {
  children: PropTypes.node,
};
