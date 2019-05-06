import { database } from "../firebase";

/* Chat messages are represented as 
 * {sender: x, timestamp: y, text: z}
 */

function _getChatRef(uid) {
  return database.collection("Chats").doc("" + uid);
}

async function createNewChat(user) {
  
}

function sendChatMessage(chatId, user, text) {
  const ref = _getChatRef(chatId);
  ref.get().then((doc) => {
    if(!doc.exists)
      throw new Error("sendChatMessage(): No chat with id " 
                     + chatId 
                     + " exists");
    let messages = doc.get("messages");
    messages.push({sender: user.uid, 
                   timestamp: 0
                   text: text
    });
  }).catch((error) => {
    throw error;
  });
}

export {
  createChat,
  sendChatMessage
}
