import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import { MaterialModule } from '@shared/modules/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  @Input() username: string | undefined;

  isDeleted: boolean = false;

  constructor(public authService: AuthService) {}
}
