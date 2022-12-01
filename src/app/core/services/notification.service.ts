import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toast: ToastrService) {}

  createToastSuccess(message: string | undefined): void {
    this.toast.success(message, '', {
      timeOut: 4000,
    });
  }
}
