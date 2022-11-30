import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgSelectModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() currenUser = '';
  formGroup!: FormGroup;
  selectedUser!: string;
  usersName!: Observable<string[]>;
  tt = 'ttt';

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      recipient: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      messageText: new FormControl('', [Validators.required]),
    });
    this.usersName = this.chatService.setUsers();
  }

  onSubmit(): void {
    const { recipient, messageText, title } = this.formGroup.value;
    this.chatService.sendMessage(messageText, title, recipient);
    this.formGroup.reset();
    this.setMessages();
  }

  onSelect(selectValue: any): void {
    console.log(selectValue);
    this.selectedUser = selectValue;
    this.newItemEvent.emit(this.selectedUser);
    this.chatService.selectUser(this.selectedUser);
    this.setMessages();
  }

  setMessages() {
    if (this.currenUser !== this.selectedUser) {
      this.chatService.renderSentMessage(this.selectedUser, this.currenUser);
    } else {
      this.chatService.renderReceivedMessage(this.currenUser);
    }
  }
}
