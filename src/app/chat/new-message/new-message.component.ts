import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
  formGroup: any;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() currenUser = '';
  userNames: string[] = [];
  selectedUser: any;

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      recipient: new FormControl(''),
      title: new FormControl(''),
      messageText: new FormControl(''),
    });
  }

  onSubmit(): void {
    const { recipient, messageText, title } = this.formGroup.value;
    this.chatService.sendMessage(messageText, title, recipient);
    if (this.currenUser === this.selectedUser) {
      this.chatService.sent(this.selectedUser, this.currenUser);
    }
  }

  onSelect(event: any): void {
    this.selectedUser = event.value;
    this.newItemEvent.emit(this.selectedUser);
    this.chatService.selectUser(this.selectedUser);
    this.chatService.sent(this.selectedUser, this.currenUser);
  }
}
