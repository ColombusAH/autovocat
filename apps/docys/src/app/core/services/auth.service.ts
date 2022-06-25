import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$!: Observable<any>;
  currentUser: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
      } else {
        localStorage.setItem('user', 'null');
        this.currentUser = null;
      }
    });
  } // NgZone service to remove outside scope warning) { }
}
