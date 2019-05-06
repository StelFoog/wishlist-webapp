import { database } from "../firebase";

/* Chats are represented as 
 * {messages: w}
 * Chat messages are represented as 
 * {sender: x, timestamp: y, text: z}
 */

function _getChatRef(uid) {
  return database.collection("Chats").doc("" + uid);
}

async function createNewChat(id) {
  const ref = _getChatRef(id);
  const doc = await ref.get();
  if(doc.exists)
    throw new Error("createNewChat(): Chat with id " + id + " already exists");
  ref.set({messages: []});
  return id;
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
    ref.set({messages: messages});
    });
  }).catch((error) => {
    throw error;
  });
}

function onChatMessageRecieved(chatId, callback) {
  const ref = _getChatRef(chatId);
  ref.on("child_changed", callback);
}

export {
  createChat,
  sendChatMessage
}
