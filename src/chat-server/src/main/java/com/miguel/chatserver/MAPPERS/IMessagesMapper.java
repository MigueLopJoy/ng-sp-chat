package com.miguel.chatserver.MAPPERS;

import com.miguel.chatserver.DTO.MessageDTO;
import com.miguel.chatserver.MODELS.Message;

import java.util.List;

public interface IMessagesMapper {

  public Message createMessageFromDTO(MessageDTO messageDTO);

  public List<Message> createMessageListFromDTOList(List<MessageDTO> messageDTOList);

  public MessageDTO createMessageDTOFromMessage(Message message);

  public List<MessageDTO> createMessageDTOListFromMessageList(List<Message> messageList);
}
