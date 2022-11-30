import { Injectable } from '@angular/core';
import { MessageInfo } from '@shared/models/message.interfaces';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages: MessageInfo[] = [];
  usersName: string[] = [];
  joined: boolean = false;
  socket: Socket;
  messagesResponse: any;

  constructor() {
    this.socket = io('http://localhost:4000');
    this.getMessage();
  }

  getMessage() {
    this.socket.emit('findAllMessages', {}, (response: any) => {
      console.log('response', response);
      this.messagesResponse = response;
    });
    this.socket.on('message', (response: any) => this.messages.push(response));
  }

  sendMessage(messageText: string, title: string, recipient: string) {
    this.socket.emit(
      'createMessage',
      { text: messageText, title: title, recipient: recipient },
      (response: any) => {}
    );
  }

  sent(select: string, current: string) {
    console.log('current', current);

    this.messages = this.messagesResponse.filter(
      (message: MessageInfo) => message.recipient === select
    );

    console.log(this.messages);
  }

  recive(currentUser: string) {
    this.messages = this.messagesResponse.filter(
      (message: MessageInfo) => message.recipient === currentUser
    );
  }

  join(name: string) {
    this.socket.emit('join', name, (response: any) => {
      console.log(response);
      response /* (this.messages = response.sendedMes); */ && (this.usersName = response.setNames);
      this.joined = true;
    });
  }

  private selectedUser$$ = new BehaviorSubject<string>('');
  public selectedUser$ = this.selectedUser$$.pipe();

  selectUser(value: string) {
    this.selectedUser$$.next(value);
  }
}
