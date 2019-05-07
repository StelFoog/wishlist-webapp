import { database } from "../firebase";

/* Chats are represented as
 * {messages: u}
 * Chat messages are represented as
 * {senderId: x, senderName: y, timestamp: z, text: w}
 */

function _getChatRef(uid) {
  return database.collection("Chats").doc("" + uid);
}

function createNewChat(id) {
  const ref = _getChatRef(id);
  ref.get().then((doc) => {
    if(!doc.exists)
      ref.set({messages: []});
  });
  return id;
}

function sendChatMessage(chatId, user, text) {
  const ref = _getChatRef(chatId);
  const msg = {
    senderId: user.uid, 
    senderName: user.name, 
    timestamp: new Date(), 
    text: text
  };
  ref.get().then((doc) => {
    if(!doc.exists)
      throw new Error("sendChatMessage(): No chat with id "
                     + chatId
                     + " exists");
    let messages = doc.data().messages;
    messages.push(msg);
    ref.set({messages: messages});
  });
  return msg;
}

async function loadChatMessages(chatId) {
  const ref = _getChatRef(chatId);
  return (await ref.get().then((doc) => {
    return doc.data();
  })).messages;
}

function onChatMessageReceived(chatId, callback) {
  return _getChatRef(chatId).onSnapshot((doc) => {
    callback(doc.data());
  });
}

export {
  onChatMessageReceived,
  createNewChat,
  sendChatMessage,
  loadChatMessages
}
