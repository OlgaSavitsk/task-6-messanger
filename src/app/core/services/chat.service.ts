import { Injectable } from '@angular/core';
import { MessageInfo } from '@shared/models/message.interfaces';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LocalStorageService } from './localstorage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private selectedUser$$ = new BehaviorSubject<string>('');
  selectedUser$ = this.selectedUser$$.pipe();
  messages: MessageInfo[] = [];
  usersName: string[] = [];
  joined: boolean = false;
  socket: Socket;
  messagesResponse: MessageInfo[] = [];
  currentName!: string | null;
  status = true;

  constructor(
    private toastrService: NotificationService,
    private storageService: LocalStorageService
  ) {
    this.socket = io('http://localhost:4000');
    this.currentName = this.storageService.loadFromLocalStorage('userName');
    this.getMessage();
  }

  getMessage(): void {
    this.socket.emit('findAllMessages', {}, (response: any) => {
      this.messagesResponse = response;
    });
    this.socket.on('message', (response: any) => {
      this.messagesResponse.push(response);
      if (response.recipient === this.currentName) {
        this.renderReceivedMessage(response.recipient);
        this.toastrService.createToastSuccess(response.text);
      } else {
        this.renderSentMessage(response.recipient, this.currentName!);
      }
    });
  }

  sendMessage(messageText: string, title: string, recipient: string): void {
    this.socket.emit(
      'createMessage',
      { text: messageText, title: title, recipient: recipient },
      () => {}
    );
  }

  renderSentMessage(select: string, current: string): void {
    this.messages = this.messagesResponse.filter(
      (message: MessageInfo) => message.recipient === select && message.name === current
    );
    this.status = false;
  }

  renderReceivedMessage(currentUser: string): void {
    this.messages = this.messagesResponse.filter(
      (message: MessageInfo) => message.recipient === currentUser
    );
    this.status = true;
  }

  join(name: string): void {
    this.socket.emit('join', name, (response: any) => {
      response && (this.usersName = response.setNames);
      this.joined = true;
    });
  }

  setUsers(val: string | null = null): Observable<string[]> {
    if (val) {
      this.usersName = this.usersName.filter(
        (user) => user.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
      );
    }
    return of(this.usersName).pipe(delay(500));
  }

  selectUser(value: string): void {
    this.selectedUser$$.next(value);
  }
}
