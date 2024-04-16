package com.miguel.chatserver.CONTROLLERS;

import com.miguel.chatserver.MODELS.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

  @MessageMapping("chat.sendMessage")
  @SendTo("/topic/public")
  public Message sendMessage(
     @Payload Message message
  ) {
    return message;
  }

  @MessageMapping("chat.addUser")
  @SendTo("/topic/public")
  public Message addUser(
    @Payload Message message,
    SimpMessageHeaderAccessor headerAccessor
  ) {
    headerAccessor.getSessionAttributes().put("phoneNumber", message.getSender().getPhoneNumber());
    return message;
  }
}
