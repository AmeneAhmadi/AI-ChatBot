const API_URL = "http://localhost:5000/chats";

export const getUserChats = async (userId) => {
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch chats");
    const chats = await response.json();
    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

export const createChatInDB = async (chat) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chat),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

export const updateChatInDB = async (chat) => {
  try {
    const response = await fetch(`${API_URL}/${chat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chat),
    });
    if (!response.ok) throw new Error("Failed to update chat");
    const updatedChat = await response.json();
    return updatedChat;
  } catch (error) {
    console.error("Error updating chat:", error);
    throw error;
  }
};

export const deleteChatFromDB = async (chatId) => {
  try {
    await fetch(`${API_URL}/${chatId}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting chat:", error);
  }
};

export const deleteAllChatsFromDB = async (userId) => {
  try {
    const userChats = await getUserChats(userId);
    for (const chat of userChats) {
      await deleteChatFromDB(chat.id);
    }
  } catch (error) {
    console.error("Error deleting all chats:", error);
  }
};

export const updateChatTitle = async (chat) => {
  try {
    const response = await fetch(`${API_URL}?chatId=${chat.chatId}`);
    const existingChat = await response.json();
    if (existingChat.length > 0) {
      await fetch(`${API_URL}/${existingChat[0].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...existingChat[0],
          messages: chat.messages,
          title: chat.title,
        }),
      });
    }
  } catch (error) {
    console.error("Error saving chat:", error);
  }
};
