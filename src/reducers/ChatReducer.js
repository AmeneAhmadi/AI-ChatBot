export const initialState = {
  chats: [],
  activeChatId: null,
};
export const chatsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CHATS":
      return { ...state, chats: action.payload };
    case "ADD_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.payload],
        activeChatId: action.payload.id,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        ),
      };
    case "ADD_AI_RESPONSE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: [...chat.messages, action.payload.aiResponse],
              }
            : chat
        ),
      };
    case "UPDATE_AI_RESPONSE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === action.payload.messageId
                    ? { ...msg, text: action.payload.text }
                    : msg
                ),
              }
            : chat
        ),
      };
    case "SELECT_CHAT":
      return { ...state, activeChatId: action.payload };
    case "CREATE_NEW_CHAT":
      return { ...state, activeChatId: null };
    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload),
        activeChatId:
          state.activeChatId === action.payload ? null : state.activeChatId,
      };
    case "DELETE_ALL_CHATS":
      return { ...state, chats: [], activeChatId: null };
    case "EDIT_CHAT_TITLE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? { ...chat, title: action.payload.newTitle }
            : chat
        ),
      };
    default:
      return state;
  }
};
