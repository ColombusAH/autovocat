import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  
  constructor(private authService: AuthService) {}
}
