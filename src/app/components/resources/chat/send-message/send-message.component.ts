import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { MessagesService } from '../../../../core/services/messages/messages.service';
import { Message } from '../../../../core/models/message';
import { WebsocketsService } from '../../../../core/services/websockets/web-sockets.service';
import { Chat } from '../../../../core/models/chat';
import { Contact } from '../../../../core/models/contac';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputGroupModule, ButtonModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss'
})
export class SendMessageComponent {

  constructor(
    private messagesService: MessagesService,
    private webSocketService: WebsocketsService
  ) {}

  @Output() errorEmitter: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  @Output() messageEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  @Input() contact!: Contact;
  @Input() chat!: Chat;
  @Input() connected: boolean = false;
  chatId!: number;
  messageText!: string;

  sendMessage(): void {
   if (this.connected) {
    this.sendCommonMessage();
   } else {
    this.sendFirstChatMessage();
   } 
  }

  sendFirstChatMessage(): void {
    if (this.messageText) {
      this.messagesService
      .sendFirstChatMessage(this.contact, this.messageText)
      .subscribe({
        next: (message: Message) => {
          this.messageEmitter.emit(message);
        },
        error: (error: HttpErrorResponse) => {
          this.errorEmitter.emit(error);
        }
      })
    }
  }

  sendCommonMessage(): void {
    if (this.messageText) {
      this.webSocketService.sendMessage({
        chatId: this.chatId,
        messageText: this.messageText
      });
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }
}