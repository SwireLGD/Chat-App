import React from "react";
import MessageList from "./Components/MessageList/MessageList";
import MessageSendHandler from "./Components/SendMessage/SendMessage";

const App  = () => {
  return (
    <>
    <MessageSendHandler />
    <MessageList />
    </>
  );
};

export default App;