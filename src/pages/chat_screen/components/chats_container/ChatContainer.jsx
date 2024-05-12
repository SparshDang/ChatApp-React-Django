import React from 'react'

import ChatBubble from './ChatBubble';

import style from './ChatContainer.module.css';

export default function ChatContainer() {
  return (
    <div className={style.chat__container}>
      <ChatBubble type="send" text="Hello I am sparsh"/>
     
      <ChatBubble type="receive" text="Hello I am sparsh"/>
     
      <ChatBubble type="send" text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nemo vitae. Et veniam qui nesciunt esse soluta vitae illo quod aliquam ducimus temporibus, voluptatem architecto ad vel enim officiis tempora dicta impedit voluptates hic, maxime minima. Aut impedit autem saepe tenetur minus vero officiis fuga sed alias perspiciatis minima molestias, blanditiis accusantium nesciunt rem. Quibusdam accusamus deserunt voluptatibus maxime minima impedit cumque ea amet numquam dolor necessitatibus laboriosam veniam earum, nam molestiae quas architecto, alias saepe adipisci culpa rerum nulla quos. Iure mollitia deserunt non earum debitis aspernatur voluptas quasi eveniet expedita accusamus, autem laudantium quo distinctio fugiat quod placeat. Sapiente fuga eaque tempore explicabo nobis. Quia eum ipsam labore officiis, odit accusantium earum explicabo commodi distinctio atque, nobis voluptatibus? Aliquid impedit quisquam obcaecati corporis, necessitatibus saepe cumque sint, sapiente, nihil reprehenderit expedita fugiat magni nulla ratione? Earum reiciendis architecto dolorum quibusdam repudiandae ipsa esse deleniti alias eum, quis corrupti minima sunt. Sequi itaque eum numquam distinctio minima reiciendis. Voluptatibus sit maxime ullam sint. Modi perferendis architecto excepturi facere quod omnis reprehenderit expedita, fugit pariatur et tempora aut est tempore velit? Quas ratione ex perspiciatis ipsum ipsa soluta dolor cupiditate hic. Impedit deleniti ratione delectus quas! Eos aperiam delectus ullam."/>

     
    </div>
  )
}
