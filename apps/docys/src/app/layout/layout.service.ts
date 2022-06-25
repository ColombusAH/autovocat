import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private authService: AuthService) {}
}
