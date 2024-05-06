import style from "./App.module.css";

import PersonTile from "./components/person_tile/PersonTile";
import SendChatForm from "./components/send_chat_form/SendChatForm";
import ChatContainer from "./components/chats_container/ChatContainer";




function App() {
  return (
    <div className={style.chat_view}>
      <div className={style.side__panel}>
        <PersonTile current/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
      </div>
      <div className={style.chat__screen}>
          <ChatContainer/>
          <SendChatForm/>
      </div>
    </div>
  );
}

export default App;
