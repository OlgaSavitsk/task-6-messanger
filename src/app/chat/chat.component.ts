import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { LocalStorageService } from '@core/services/localstorage.service';
import { MessageInfo } from '@shared/models/message.interfaces';
import { MaterialModule } from '@shared/modules/material/material.module';
import { ToastrService } from 'ngx-toastr';
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
  user!: string;

  constructor(private storageService: LocalStorageService, public chatService: ChatService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
    });
    this.chatService.selectedUser$.subscribe((user) => (this.user = user));
    this.currentUser = this.storageService.loadFromLocalStorage('userName')!;
  }

  onSubmit(): void {
    const { login } = this.formGroup.value;
    this.storageService.setStorageData({ name: login }, 'userName');
    this.chatService.join(login);
    this.user = this.currentUser;
    this.chatService.renderReceivedMessage(login);
  }

  selectUser(name: string) {
    this.selectedUser = name;
    this.user = this.selectedUser;
    this.selectedUser === this.currentUser && (this.user = this.currentUser);
    this.chatService.renderSentMessage(this.selectedUser, this.currentUser);
  }
}
