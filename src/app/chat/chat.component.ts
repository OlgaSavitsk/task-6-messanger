import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { MessageInfo } from '@shared/models/message.interfaces';
import { MaterialModule } from '@shared/modules/material/material.module';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MaterialModule, NewMessageComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  formGroup!: FormGroup;
  selectedUser: string = '';
  currentUser!: string;
  sentMessages: MessageInfo[] = [];
  user!: string;
  messages: MessageInfo[] = [];
  constructor(private fb: FormBuilder, public chatService: ChatService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
    });
    this.chatService.selectedUser$.subscribe((user) => (this.user = user));
    // console.log('chat', this.chatService.messages);
  }

  onSubmit(): void {
    const { login } = this.formGroup.value;
    this.chatService.join(login);
    this.currentUser = login;
    this.user = this.currentUser;
    this.chatService.recive(this.currentUser);
  }

  selectUser(name: string) {
    this.selectedUser = name;
    this.user = this.selectedUser;
    this.selectedUser === this.currentUser && (this.user = this.currentUser);
    this.chatService.sent(this.selectedUser, this.currentUser);
  }
}
